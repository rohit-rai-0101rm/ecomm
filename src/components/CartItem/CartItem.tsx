import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, radius, spacing, useTheme } from '../../theme';
import { CartEntry } from '../../types/product';
import { formatPrice } from '../../utils/format';
import { QuantityStepper } from '../QuantityStepper';

interface Props {
  entry: CartEntry;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onPress: (id: number) => void;
}

function CartItemBase({ entry, onIncrease, onDecrease, onRemove, onPress }: Props) {
  const { colors } = useTheme();
  const { product, quantity } = entry;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Pressable
        onPress={() => onPress(product.id)}
        style={[styles.imageWrap, { backgroundColor: colors.white }]}>
        <Image
          source={{ uri: product.image, cache: 'force-cache' }}
          style={styles.image}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {product.title}
          </Text>
          <Pressable onPress={() => onRemove(product.id)} hitSlop={10}>
            <Icon name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </View>
        <Text style={[styles.price, { color: colors.primary }]}>
          {formatPrice(product.price)}
        </Text>
        <View style={styles.bottom}>
          <QuantityStepper
            small
            value={quantity}
            minimum={0}
            onIncrease={() => onIncrease(product.id)}
            onDecrease={() => onDecrease(product.id)}
          />
          <Text style={[styles.subtotal, { color: colors.textMuted }]}>
            {formatPrice(product.price * quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export const CartItem = memo(CartItemBase);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  imageWrap: {
    width: 84,
    height: 84,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  image: { flex: 1 },
  body: { flex: 1, justifyContent: 'space-between', gap: spacing.xs },
  top: { flexDirection: 'row', gap: spacing.sm },
  title: { flex: 1, fontSize: fontSize.sm, fontWeight: '700' },
  price: { fontSize: fontSize.md, fontWeight: '800' },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtotal: { fontSize: fontSize.sm, fontWeight: '600' },
});
