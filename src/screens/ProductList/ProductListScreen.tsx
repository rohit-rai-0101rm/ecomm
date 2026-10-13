import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CategoryChips } from '../../components/CategoryChips';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { OfflineBanner } from '../../components/OfflineBanner';
import { ProductCard } from '../../components/ProductCard';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { ProductListSkeleton } from '../../components/skeletons';
import { Toast } from '../../components/Toast';
import { useDebounced, useNetwork, useToast } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCartItems } from '../../store/selectors';
import { logout } from '../../store/slices/authSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { loadProducts } from '../../store/slices/productsSlice';
import { setThemeMode } from '../../store/slices/themeSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { spacing, useTheme } from '../../theme';
import { Product } from '../../types/product';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductList'>;

const ALL = 'all';
const WISHLIST = 'wishlist';
const PAGE_SIZE = 8;

export function ProductListScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const online = useNetwork();
  const toast = useToast();
  const { items, status, refreshing, error } = useAppSelector(
    state => state.products,
  );
  const cartItems = useAppSelector(selectCartItems);
  const wishlist = useAppSelector(state => state.wishlist.ids);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const debouncedQuery = useDebounced(query);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [debouncedQuery, category]);

  const categories = useMemo(
    () => [ALL, WISHLIST, ...Array.from(new Set(items.map(p => p.category)))],
    [items],
  );

  const filtered = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();
    return items.filter(p => {
      if (category === WISHLIST && !wishlist.includes(p.id)) {
        return false;
      }
      if (
        category !== ALL &&
        category !== WISHLIST &&
        p.category !== category
      ) {
        return false;
      }
      return !term || p.title.toLowerCase().includes(term);
    });
  }, [items, debouncedQuery, category, wishlist]);

  const page = useMemo(() => {
    const slice: (Product | null)[] = filtered.slice(0, visible);
    if (slice.length % 2 === 1) {
      slice.push(null);
    }
    return slice;
  }, [filtered, visible]);
  const cartIds = useMemo(
    () => new Set(cartItems.map(i => i.product.id)),
    [cartItems],
  );

  const retry = useCallback(() => dispatch(loadProducts()), [dispatch]);
  const refresh = useCallback(() => {
    dispatch(loadProducts({ refresh: true }));
  }, [dispatch]);

  const handleAdd = useCallback(
    (product: Product) => {
      dispatch(addToCart({ product }));
      toast.show('Product added to cart');
    },
    [dispatch, toast],
  );

  const handleOpen = useCallback(
    (product: Product) =>
      navigation.navigate('ProductDetails', { productId: product.id }),
    [navigation],
  );

  const handleWishlist = useCallback(
    (id: number) => dispatch(toggleWishlist(id)),
    [dispatch],
  );

  const loadMore = useCallback(() => {
    setVisible(v => (v < filtered.length ? v + PAGE_SIZE : v));
  }, [filtered.length]);

  const confirmLogout = () => {
    Alert.alert('Logout', 'Do you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          navigation.replace('Login');
        },
      },
    ]);
  };

  const toggleTheme = () => dispatch(setThemeMode(isDark ? 'light' : 'dark'));

  const headerRight = (
    <>
      <Pressable onPress={toggleTheme} hitSlop={10}>
        <Icon
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={22}
          color={colors.primaryText}
        />
      </Pressable>
      <Pressable onPress={confirmLogout} hitSlop={10}>
        <Icon name="log-out-outline" size={22} color={colors.primaryText} />
      </Pressable>
    </>
  );

  const renderBody = () => {
    if (status === 'loading' || status === 'idle') {
      return <ProductListSkeleton />;
    }
    if (status === 'failed' && items.length === 0) {
      return (
        <ErrorState message={error ?? 'Something went wrong'} onRetry={retry} />
      );
    }
    return (
      <FlatList
        data={page}
        keyExtractor={(item, index) =>
          item ? String(item.id) : `spacer-${index}`
        }
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        initialNumToRender={PAGE_SIZE}
        windowSize={7}
        removeClippedSubviews
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title={
              items.length === 0 ? 'No products available' : 'No products found'
            }
            message={
              items.length === 0
                ? 'There is nothing to show right now.'
                : 'Try a different search or category.'
            }
            actionLabel={items.length === 0 ? 'Retry' : undefined}
            onAction={items.length === 0 ? retry : undefined}
          />
        }
        ListFooterComponent={
          <View>
            {visible < filtered.length ? (
              <ActivityIndicator color={colors.primary} style={styles.footer} />
            ) : null}
          </View>
        }
        renderItem={({ item }) =>
          item ? (
            <ProductCard
              product={item}
              wishlisted={wishlist.includes(item.id)}
              inCart={cartIds.has(item.id)}
              onPress={handleOpen}
              onAddToCart={handleAdd}
              onToggleWishlist={handleWishlist}
            />
          ) : (
            <View style={styles.flex} />
          )
        }
      />
    );
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Products"
        right={headerRight}
        onCartPress={() => navigation.navigate('Cart')}
      />
      {!online ? <OfflineBanner /> : null}
      <View style={styles.search}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>
      {items.length > 0 ? (
        <View style={styles.chips}>
          <CategoryChips
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </View>
      ) : null}
      <View style={styles.flex}>{renderBody()}</View>
      <Toast
        message={toast.message}
        actionLabel="View Cart"
        onAction={() => navigation.navigate('Cart')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  search: { padding: spacing.lg, paddingBottom: spacing.sm },
  chips: { paddingBottom: spacing.sm },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl * 2, flexGrow: 1 },
  column: { gap: spacing.md, marginBottom: spacing.md },
  footer: { marginVertical: spacing.lg },
});
