import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, radius, spacing, useTheme } from '../../theme';
import { Product } from '../../types/product';
import { capitalize, formatPrice } from '../../utils/format';
import { Button } from '../Button';
import { Rating } from '../Rating';

interface Props {
  product: Product;
  wishlisted: boolean;
  inCart: boolean;
  onPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: number) => void;
}

function ProductCardBase({
  product,
  wishlisted,
  inCart,
  onPress,
  onAddToCart,
  onToggleWishlist,
}: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => onPress(product)}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.imageWrap, { backgroundColor: colors.white }]}>
        <Image
          source={{ uri: product.image, cache: 'force-cache' }}
          style={styles.image}
          resizeMode="contain"
        />
        <Pressable
          onPress={() => onToggleWishlist(product.id)}
          hitSlop={8}
          style={[styles.heart, { backgroundColor: colors.surface }]}>
          <Icon
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? colors.danger : colors.textMuted}
          />
        </Pressable>
        {inCart ? (
          <View style={[styles.added, { backgroundColor: colors.success }]}>
            <Icon name="checkmark" size={11} color={colors.white} />
            <Text style={[styles.addedText, { color: colors.white }]}>Added</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={[styles.category, { color: colors.textMuted }]} numberOfLines={1}>
          {capitalize(product.category)}
        </Text>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.price, { color: colors.primary }]}>
            {formatPrice(product.price)}
          </Text>
          <Rating rating={product.rating} />
        </View>
        <Button
          label="Add to Cart"
          icon="cart-outline"
          compact
          onPress={() => onAddToCart(product)}
        />
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardBase);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 150,
    padding: spacing.md,
  },
  image: { flex: 1 },
  heart: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  added: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  addedText: { fontSize: fontSize.xs, fontWeight: '700' },
  body: { padding: spacing.md, gap: spacing.xs },
  category: { fontSize: fontSize.xs, fontWeight: '600' },
  title: { fontSize: fontSize.sm, fontWeight: '700', minHeight: 36 },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  price: { fontSize: fontSize.md, fontWeight: '800' },
});
