import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, radius, spacing, useTheme } from '../../theme';

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minimum?: number;
  small?: boolean;
}

export function QuantityStepper({
  value,
  onIncrease,
  onDecrease,
  minimum = 1,
  small = false,
}: Props) {
  const { colors } = useTheme();
  const size = small ? 28 : 36;
  const atMin = value <= minimum;

  return (
    <View style={[styles.row, { backgroundColor: colors.surfaceAlt }]}>
      <Pressable
        onPress={onDecrease}
        disabled={atMin}
        hitSlop={6}
        style={[styles.btn, { width: size, height: size, opacity: atMin ? 0.4 : 1 }]}>
        <Icon name="remove" size={18} color={colors.primary} />
      </Pressable>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Pressable
        onPress={onIncrease}
        hitSlop={6}
        style={[styles.btn, { width: size, height: size }]}>
        <Icon name="add" size={18} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.xs,
  },
  btn: { alignItems: 'center', justifyContent: 'center' },
  value: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: fontSize.md,
    fontWeight: '700',
  },
});
