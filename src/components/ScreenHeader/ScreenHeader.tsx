import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, spacing, useTheme } from '../../theme';
import { CartBadge } from '../CartBadge';

interface Props {
  title: string;
  onBack?: () => void;
  onCartPress?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, onBack, onCartPress, right }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: colors.primary, paddingTop: insets.top + spacing.sm },
      ]}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={10}>
            <Icon name="arrow-back" size={24} color={colors.primaryText} />
          </Pressable>
        ) : null}
      </View>
      <Text style={[styles.title, { color: colors.primaryText }]} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.sideRight]}>
        {right}
        {onCartPress ? <CartBadge onPress={onCartPress} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  side: { width: 88, minHeight: 34, flexDirection: 'row', alignItems: 'center' },
  sideRight: { justifyContent: 'flex-end', gap: spacing.md },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
});
