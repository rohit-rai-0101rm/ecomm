import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../theme';
import { Skeleton } from './Bone';

const PLACEHOLDERS = [0, 1, 2];

export function CartSkeleton() {
  return (
    <Skeleton>
      <View style={{ padding: spacing.lg, gap: spacing.md }}>
        {PLACEHOLDERS.map(i => (
          <View key={i} style={{ flexDirection: 'row', gap: spacing.md }}>
            <View style={{ width: 84, height: 84, borderRadius: 12 }} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View style={{ width: '80%', height: 14, borderRadius: 4 }} />
              <View style={{ width: 70, height: 16, borderRadius: 4 }} />
              <View style={{ width: 100, height: 28, borderRadius: 8 }} />
            </View>
          </View>
        ))}
        <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
          <View style={{ width: '100%', height: 14, borderRadius: 4 }} />
          <View style={{ width: '100%', height: 14, borderRadius: 4 }} />
          <View style={{ width: '100%', height: 20, borderRadius: 4 }} />
          <View style={{ width: '100%', height: 50, borderRadius: 12, marginTop: spacing.md }} />
        </View>
      </View>
    </Skeleton>
  );
}
