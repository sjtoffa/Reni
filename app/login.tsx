import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function LoginScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin() {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      Alert.alert('Login failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#F5EFE8', '#F8F7F4', '#F8F5F2']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Wordmark */}
          <View style={styles.wordmarkWrap}>
            <Text style={styles.logo}>re<Text style={styles.logoAccent}>n</Text>i</Text>
            <Text style={styles.tagline}>Your renaissance starts here</Text>
          </View>

          {/* Connection icon */}
          <View style={styles.iconWrap}>
            <Svg width={220} height={220} viewBox="0 0 24 24" fill="none">
              <Path d="M13.81 3.70 A8.5 8.5 0 0 1 20.10 14.60" stroke="#BE7B74" strokeWidth="0.9" strokeOpacity="0.85"/>
              <Path d="M18.30 17.71 A8.5 8.5 0 0 1 5.70 17.71" stroke="#BE7B74" strokeWidth="0.9" strokeOpacity="0.85"/>
              <Path d="M3.90 14.60 A8.5 8.5 0 0 1 10.19 3.70" stroke="#BE7B74" strokeWidth="0.9" strokeOpacity="0.85"/>
              <Circle cx="12" cy="3.5" r="1.8" stroke="#BE7B74" strokeWidth="0.9" strokeOpacity="0.85" fill="#F5EFE8"/>
              <Circle cx="19.36" cy="16.25" r="1.8" stroke="#BE7B74" strokeWidth="0.9" strokeOpacity="0.85" fill="#F5EFE8"/>
              <Circle cx="4.64" cy="16.25" r="1.8" stroke="#BE7B74" strokeWidth="0.9" strokeOpacity="0.85" fill="#F5EFE8"/>
            </Svg>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={styles.sub}>Connect with your PMDD community</Text>

            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.btnPrimary} onPress={handleEmailLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnPrimaryText}>Continue</Text>}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.btnGoogle} onPress={() => onNavigate('google-auth')}>
              <Text style={styles.btnGoogleText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkRow} onPress={() => onNavigate('signup')}>
              <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkBold}>Sign up</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  wordmarkWrap: {
    alignItems: 'center',
    paddingTop: 64,
  },
  logo: {
    fontSize: 38,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: 1,
  },
  logoAccent: {
    color: '#BE7B74',
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  iconWrap: {
    alignItems: 'center',
    marginTop: 4,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1C1C1E',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  btnPrimary: {
    width: '100%',
    height: 50,
    backgroundColor: '#BE7B74',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EBEBEB',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#6B7280',
    fontSize: 13,
  },
  btnGoogle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  btnGoogleText: {
    color: '#1C1C1E',
    fontSize: 15,
    fontWeight: '500',
  },
  linkRow: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#6B7280',
    fontSize: 14,
  },
  linkBold: {
    color: '#BE7B74',
    fontWeight: '600',
  },
});
