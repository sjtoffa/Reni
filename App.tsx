import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import LoginScreen from './app/login';
import SignupScreen from './app/signup';
import MainApp from './app/MainApp';

type Screen = 'login' | 'signup' | 'google-auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [screen, setScreen] = useState<Screen>('login');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return unsub;
  }, []);

  if (checking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#5b372d" />
      </View>
    );
  }

  if (user) {
    return <MainApp />;
  }

  if (screen === 'signup') {
    return <SignupScreen onNavigate={(s) => setScreen(s as Screen)} />;
  }

  return <LoginScreen onNavigate={(s) => setScreen(s as Screen)} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fdf7f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
