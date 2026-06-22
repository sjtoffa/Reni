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
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function SignupScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password || !confirm) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      Alert.alert('Signup failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>reni</Text>
      <Text style={styles.tagline}>create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b0a09a"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b0a09a"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        placeholderTextColor="#b0a09a"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnPrimaryText}>Create account</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => onNavigate('login')}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkBold}>Log in</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: 1,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 36,
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
  linkRow: {
    marginTop: 24,
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
