import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, radius, spacing, useTheme } from '../../theme';

interface Props {
  message: string | null;
  actionLabel?: string;
  onAction?: () => void;
  bottomOffset?: number;
}

export function Toast({ message, actionLabel, onAction, bottomOffset = spacing.xl }: Props) {
  const { colors } = useTheme();
  const progress = useRef(new Animated.Value(0)).current;
  const lastMessage = useRef(message);

  if (message) {
    lastMessage.current = message;
  }

  useEffect(() => {
    Animated.timing(progress, {
      toValue: message ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [message, progress]);

  return (
    <Animated.View
      pointerEvents={message ? 'auto' : 'none'}
      style={[
        styles.wrap,
        {
          bottom: bottomOffset,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}>
      <Icon name="checkmark-circle" size={20} color={colors.success} />
      <Text style={[styles.text, { color: colors.text }]}>{lastMessage.current}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[styles.action, { color: colors.primary }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  text: { flex: 1, fontSize: fontSize.sm, fontWeight: '600' },
  action: { fontSize: fontSize.sm, fontWeight: '800' },
});
