import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { ErrorState } from '../../components/ErrorState';
import { QuantityStepper } from '../../components/QuantityStepper';
import { Rating } from '../../components/Rating';
import { ScreenHeader } from '../../components/ScreenHeader';
import { ProductDetailsSkeleton } from '../../components/skeletons';
import { Toast } from '../../components/Toast';
import { useProduct, useToast } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { fontSize, radius, spacing, useTheme } from '../../theme';
import { capitalize, formatPrice } from '../../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export function ProductDetailsScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { product, loading, error, reload } = useProduct(productId);
  const wishlisted = useAppSelector(state => state.wishlist.ids.includes(productId));
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const handleAdd = () => {
    if (!product) {
      return;
    }
    dispatch(addToCart({ product, quantity }));
    toast.show(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`);
    setQuantity(1);
  };

  const heart = (
    <Pressable onPress={() => dispatch(toggleWishlist(productId))} hitSlop={10}>
      <Icon
        name={wishlisted ? 'heart' : 'heart-outline'}
        size={24}
        color={colors.primaryText}
      />
    </Pressable>
  );

  const renderBody = () => {
    if (loading) {
      return <ProductDetailsSkeleton />;
    }
    if (error || !product) {
      return <ErrorState message={error ?? 'Product not found'} onRetry={reload} />;
    }
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.imageWrap, { backgroundColor: colors.white }]}>
            <Image
              source={{ uri: product.image, cache: 'force-cache' }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            {formatPrice(product.price)}
          </Text>
          <Rating rating={product.rating} showCount />

          <Text style={[styles.section, { color: colors.text }]}>Description</Text>
          <Text
            style={[styles.description, { color: colors.textMuted }]}
            numberOfLines={expanded ? undefined : 4}>
            {product.description}
          </Text>
          <Pressable onPress={() => setExpanded(e => !e)}>
            <Text style={[styles.more, { color: colors.primary }]}>
              {expanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>

          <Text style={[styles.section, { color: colors.text }]}>Category</Text>
          <View style={[styles.chip, { backgroundColor: colors.surfaceAlt }]}>
            <Text style={[styles.chipText, { color: colors.primary }]}>
              {capitalize(product.category)}
            </Text>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              paddingBottom: insets.bottom + spacing.md,
            },
          ]}>
          <QuantityStepper
            value={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          />
          <Button
            label="ADD TO CART"
            icon="cart-outline"
            onPress={handleAdd}
            style={styles.addBtn}
          />
        </View>
      </>
    );
  };

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Details"
        onBack={() => navigation.goBack()}
        right={heart}
        onCartPress={() => navigation.navigate('Cart')}
      />
      <View style={styles.flex}>{renderBody()}</View>
      <Toast
        message={toast.message}
        actionLabel="View Cart"
        onAction={() => navigation.navigate('Cart')}
        bottomOffset={96 + insets.bottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  imageWrap: {
    height: 300,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  image: { flex: 1 },
  title: { fontSize: fontSize.xl, fontWeight: '800' },
  price: {
    fontSize: fontSize.xxl,
    fontWeight: '800',
    marginVertical: spacing.sm,
  },
  section: {
    fontSize: fontSize.md,
    fontWeight: '800',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  description: { fontSize: fontSize.md, lineHeight: 22 },
  more: { fontSize: fontSize.sm, fontWeight: '700', marginTop: spacing.sm },
  chip: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chipText: { fontSize: fontSize.sm, fontWeight: '700' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderTopWidth: 1,
  },
  addBtn: { flex: 1 },
});
