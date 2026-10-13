import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../store/hooks';
import { selectCartCount } from '../../store/selectors';
import { fontSize, useTheme } from '../../theme';

interface Props {
  onPress: () => void;
}

export function CartBadge({ onPress }: Props) {
  const { colors } = useTheme();
  const count = useAppSelector(selectCartCount);

  return (
    <Pressable onPress={onPress} hitSlop={10} style={styles.wrap}>
      <Icon name="cart-outline" size={26} color={colors.primaryText} />
      {count > 0 ? (
        <View style={[styles.badge, { backgroundColor: colors.danger }]}>
          <Text style={[styles.text, { color: colors.white }]}>
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 4 },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: fontSize.xs, fontWeight: '800' },
});
