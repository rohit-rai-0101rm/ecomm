import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSize, radius, spacing, useTheme } from '../../theme';

interface Props extends TextInputProps {
  label: string;
  icon: string;
  error?: string;
  secure?: boolean;
}

export function Input({ label, icon, error, secure, ...rest }: Props) {
  const { colors } = useTheme();
  const [hidden, setHidden] = useState(!!secure);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <View
        style={[
          styles.field,
          {
            backgroundColor: colors.surface,
            borderColor: error
              ? colors.danger
              : focused
              ? colors.primary
              : colors.border,
          },
        ]}>
        <Icon name={icon} size={20} color={colors.textMuted} />
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textMuted}
          onFocus={e => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, { color: colors.text }]}
        />
        {secure ? (
          <Pressable onPress={() => setHidden(h => !h)} hitSlop={8}>
            <Icon
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    minHeight: 52,
  },
  input: { flex: 1, fontSize: fontSize.md, paddingVertical: spacing.md },
  error: { fontSize: fontSize.xs, marginTop: spacing.xs },
});
