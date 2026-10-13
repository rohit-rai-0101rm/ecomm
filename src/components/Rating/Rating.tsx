import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, spacing, useTheme } from '../../theme';
import { ProductRating } from '../../types/product';

interface Props {
  rating: ProductRating;
  showCount?: boolean;
}

export function Rating({ rating, showCount = false }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <Icon name="star" size={13} color={colors.star} />
      <Text style={[styles.text, { color: colors.text }]}>
        {rating.rate.toFixed(1)}
      </Text>
      {showCount ? (
        <Text style={[styles.count, { color: colors.textMuted }]}>
          ({rating.count} reviews)
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  text: { fontSize: fontSize.sm, fontWeight: '600' },
  count: { fontSize: fontSize.sm },
});
