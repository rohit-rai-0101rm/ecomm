import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { CartItem } from '../../components/CartItem';
import { EmptyState } from '../../components/EmptyState';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CartSkeleton } from '../../components/skeletons';
import { useSkeletonDelay } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCartCount, selectCartItems, selectCartTotal } from '../../store/selectors';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../store/slices/cartSlice';
import { fontSize, spacing, useTheme } from '../../theme';
import { formatPrice } from '../../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export function CartScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const skeleton = useSkeletonDelay(500);
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  const increase = useCallback((id: number) => dispatch(increaseQuantity(id)), [dispatch]);
  const decrease = useCallback((id: number) => dispatch(decreaseQuantity(id)), [dispatch]);
  const remove = useCallback((id: number) => dispatch(removeFromCart(id)), [dispatch]);
  const open = useCallback(
    (id: number) => navigation.navigate('ProductDetails', { productId: id }),
    [navigation],
  );

  const confirmClear = () => {
    Alert.alert('Clear cart', 'Remove all items from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => dispatch(clearCart()) },
    ]);
  };

  const checkout = () => {
    Alert.alert('Order placed', 'Thank you for shopping with ShopEasy!', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearCart());
          navigation.goBack();
        },
      },
    ]);
  };

  const clearButton =
    items.length > 0 ? (
      <Pressable onPress={confirmClear} hitSlop={10}>
        <Icon name="trash-outline" size={22} color={colors.primaryText} />
      </Pressable>
    ) : null;

  const renderBody = () => {
    if (skeleton) {
      return <CartSkeleton />;
    }
    if (items.length === 0) {
      return (
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          message="Add some products to get started."
          actionLabel="Browse Products"
          onAction={() => navigation.navigate('ProductList')}
        />
      );
    }
    return (
      <>
        <FlatList
          data={items}
          keyExtractor={entry => String(entry.product.id)}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CartItem
              entry={item}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={remove}
              onPress={open}
            />
          )}
        />
        <View
          style={[
            styles.summary,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textMuted }]}>Total Items</Text>
            <Text style={[styles.value, { color: colors.text }]}>{count}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total Amount</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              {formatPrice(total)}
            </Text>
          </View>
          <Button label="PROCEED TO CHECKOUT" onPress={checkout} style={styles.checkout} />
        </View>
      </>
    );
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="My Cart"
        onBack={() => navigation.goBack()}
        right={clearButton}
      />
      <View style={styles.flex}>{renderBody()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  list: { padding: spacing.lg },
  separator: { height: spacing.md },
  summary: {
    padding: spacing.lg,
    borderTopWidth: 1,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: fontSize.md },
  value: { fontSize: fontSize.md, fontWeight: '700' },
  totalLabel: { fontSize: fontSize.lg, fontWeight: '800' },
  totalValue: { fontSize: fontSize.lg, fontWeight: '800' },
  checkout: { marginTop: spacing.sm },
});
