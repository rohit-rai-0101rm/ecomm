import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTheme } from '../../theme';

export function Skeleton({ children }: { children: React.ReactElement }) {
  const { colors } = useTheme();
  return (
    <SkeletonPlaceholder
      backgroundColor={colors.skeletonBg}
      highlightColor={colors.skeletonHighlight}>
      {children}
    </SkeletonPlaceholder>
  );
}
