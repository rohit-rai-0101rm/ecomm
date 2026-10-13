import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, radius, spacing, useTheme } from '../../theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  compact?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  compact = false,
  style,
}: Props) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';
  const fg = isPrimary ? colors.primaryText : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        {
          backgroundColor: isPrimary ? colors.primary : 'transparent',
          borderColor: variant === 'ghost' ? 'transparent' : colors.primary,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon ? <Icon name={icon} size={compact ? 16 : 18} color={fg} /> : null}
          <Text style={[styles.label, compact && styles.labelCompact, { color: fg }]}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  compact: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  labelCompact: {
    fontSize: fontSize.sm,
  },
});
