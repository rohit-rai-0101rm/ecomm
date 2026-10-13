import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../theme';
import { Skeleton } from './Bone';

const PLACEHOLDERS = [0, 1, 2, 3, 4, 5];

export function ProductListSkeleton() {
  return (
    <Skeleton>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: spacing.lg,
          gap: spacing.md,
        }}>
        {PLACEHOLDERS.map(i => (
          <View key={i} style={{ width: '47.5%' }}>
            <View style={{ height: 150, borderRadius: 16 }} />
            <View style={{ width: '50%', height: 10, borderRadius: 4, marginTop: spacing.md }} />
            <View style={{ width: '90%', height: 14, borderRadius: 4, marginTop: spacing.sm }} />
            <View style={{ width: '70%', height: 14, borderRadius: 4, marginTop: spacing.xs }} />
            <View style={{ width: '100%', height: 36, borderRadius: 8, marginTop: spacing.md }} />
          </View>
        ))}
      </View>
    </Skeleton>
  );
}
