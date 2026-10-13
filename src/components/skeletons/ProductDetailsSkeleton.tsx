import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../theme';
import { Skeleton } from './Bone';

export function ProductDetailsSkeleton() {
  return (
    <Skeleton>
      <View style={{ padding: spacing.lg }}>
        <View style={{ height: 300, borderRadius: 16 }} />
        <View style={{ width: '85%', height: 22, borderRadius: 6, marginTop: spacing.xl }} />
        <View style={{ width: '60%', height: 22, borderRadius: 6, marginTop: spacing.sm }} />
        <View style={{ width: 110, height: 26, borderRadius: 6, marginTop: spacing.lg }} />
        <View style={{ width: 90, height: 16, borderRadius: 6, marginTop: spacing.md }} />
        <View style={{ width: '100%', height: 12, borderRadius: 4, marginTop: spacing.xl }} />
        <View style={{ width: '100%', height: 12, borderRadius: 4, marginTop: spacing.sm }} />
        <View style={{ width: '95%', height: 12, borderRadius: 4, marginTop: spacing.sm }} />
        <View style={{ width: '70%', height: 12, borderRadius: 4, marginTop: spacing.sm }} />
        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl }}>
          <View style={{ width: 120, height: 50, borderRadius: 12 }} />
          <View style={{ flex: 1, height: 50, borderRadius: 12 }} />
        </View>
      </View>
    </Skeleton>
  );
}
