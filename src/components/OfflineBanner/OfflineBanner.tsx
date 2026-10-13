import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, spacing, useTheme } from '../../theme';

export function OfflineBanner() {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.danger }]}>
      <Icon name="cloud-offline-outline" size={16} color={colors.white} />
      <Text style={[styles.text, { color: colors.white }]}>
        No internet connection
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  text: { fontSize: fontSize.sm, fontWeight: '600' },
});
