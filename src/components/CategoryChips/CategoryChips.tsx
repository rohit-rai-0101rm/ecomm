import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { fontSize, radius, spacing, useTheme } from '../../theme';
import { capitalize } from '../../utils/format';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({ categories, selected, onSelect }: Props) {
  const { colors } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {categories.map(category => {
        const active = category === selected;
        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}>
            <Text
              style={[
                styles.text,
                { color: active ? colors.primaryText : colors.text },
              ]}>
              {capitalize(category)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingHorizontal: spacing.lg },
  chip: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  text: { fontSize: fontSize.sm, fontWeight: '600' },
});
