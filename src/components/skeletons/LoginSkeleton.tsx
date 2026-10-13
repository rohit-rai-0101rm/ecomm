import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../theme';
import { Skeleton } from './Bone';

export function LoginSkeleton() {
  return (
    <Skeleton>
      <View style={{ padding: spacing.xl, alignItems: 'center' }}>
        <View style={{ width: 88, height: 88, borderRadius: 44 }} />
        <View style={{ width: 180, height: 24, borderRadius: 6, marginTop: spacing.lg }} />
        <View style={{ width: 140, height: 14, borderRadius: 6, marginTop: spacing.sm }} />
        <View style={{ width: '100%', height: 52, borderRadius: 12, marginTop: spacing.xxl }} />
        <View style={{ width: '100%', height: 52, borderRadius: 12, marginTop: spacing.lg }} />
        <View style={{ width: '100%', height: 50, borderRadius: 12, marginTop: spacing.xl }} />
      </View>
    </Skeleton>
  );
}
