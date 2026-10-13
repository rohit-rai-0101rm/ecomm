import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRehydrated } from '../../hooks';
import { RootStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';
import { fontSize, spacing, useTheme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const MIN_DURATION = 1400;

export function SplashScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const rehydrated = useRehydrated();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const startedAt = useRef(Date.now()).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [scale, opacity]);

  useEffect(() => {
    if (!rehydrated) {
      return undefined;
    }
    const wait = Math.max(0, MIN_DURATION - (Date.now() - startedAt));
    const timer = setTimeout(() => {
      navigation.replace(isLoggedIn ? 'ProductList' : 'Login');
    }, wait);
    return () => clearTimeout(timer);
  }, [rehydrated, isLoggedIn, navigation, startedAt]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View style={[styles.logoWrap, { opacity, transform: [{ scale }] }]}>
        <View style={[styles.logo, { backgroundColor: colors.white }]}>
          <Icon name="bag-handle" size={52} color={colors.primary} />
        </View>
        <Text style={[styles.name, { color: colors.primaryText }]}>ShopEasy</Text>
        <Text style={[styles.tag, { color: colors.primaryText }]}>
          Shop smart. Shop easy.
        </Text>
      </Animated.View>
      <ActivityIndicator color={colors.primaryText} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { alignItems: 'center' },
  logo: {
    width: 108,
    height: 108,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: fontSize.xxl, fontWeight: '800', marginTop: spacing.lg },
  tag: { fontSize: fontSize.md, opacity: 0.8, marginTop: spacing.xs },
  loader: { position: 'absolute', bottom: 64 },
});
