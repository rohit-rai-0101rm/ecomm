import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { LoginSkeleton } from '../../components/skeletons';
import { useSkeletonDelay } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';
import { fontSize, radius, spacing, useTheme } from '../../theme';
import {
  isValidCredentials,
  LoginErrors,
  STATIC_PASSWORD,
  STATIC_USERNAME,
  validateLogin,
} from '../../utils/validators';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const skeleton = useSkeletonDelay();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = () => {
    const found = validateLogin(username, password);
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length > 0) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      if (isValidCredentials(username, password)) {
        dispatch(loginSuccess(username.trim()));
        navigation.replace('ProductList');
      } else {
        setFormError('Invalid username or password');
        setSubmitting(false);
      }
    }, 500);
  };

  const fillDemo = () => {
    setUsername(STATIC_USERNAME);
    setPassword(STATIC_PASSWORD);
    setErrors({});
    setFormError(null);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xxl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled">
        {skeleton ? (
          <LoginSkeleton />
        ) : (
          <>
            <View style={styles.hero}>
              <View style={[styles.logo, { backgroundColor: colors.primary }]}>
                <Icon name="bag-handle" size={40} color={colors.primaryText} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Welcome Back 👋</Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                Please login to continue
              </Text>
            </View>

            <Input
              label="Username"
              icon="person-outline"
              placeholder="Enter username"
              value={username}
              onChangeText={text => {
                setUsername(text);
                setErrors(e => ({ ...e, username: undefined }));
              }}
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.username}
            />
            <Input
              label="Password"
              icon="lock-closed-outline"
              placeholder="Enter password"
              secure
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors(e => ({ ...e, password: undefined }));
              }}
              autoCapitalize="none"
              error={errors.password}
              onSubmitEditing={handleLogin}
            />

            {formError ? (
              <Text style={[styles.formError, { color: colors.danger }]}>{formError}</Text>
            ) : null}

            <Button label="LOGIN" onPress={handleLogin} loading={submitting} />

            <View
              style={[
                styles.demo,
                { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
              ]}>
              <Text style={[styles.demoTitle, { color: colors.textMuted }]}>
                Use this credential
              </Text>
              <Text style={[styles.demoText, { color: colors.text }]}>
                Username: {STATIC_USERNAME}
              </Text>
              <Text style={[styles.demoText, { color: colors.text }]}>
                Password: {STATIC_PASSWORD}
              </Text>
              <Button
                label="Autofill"
                variant="ghost"
                compact
                onPress={fillDemo}
                style={styles.autofill}
              />
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: spacing.xl, flexGrow: 1 },
  hero: { alignItems: 'center', marginBottom: spacing.xxl },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: fontSize.xl, fontWeight: '800', marginTop: spacing.lg },
  subtitle: { fontSize: fontSize.md, marginTop: spacing.xs },
  formError: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  demo: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  demoTitle: { fontSize: fontSize.sm },
  demoText: { fontSize: fontSize.md, fontWeight: '700' },
  autofill: { marginTop: spacing.sm },
});
