import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { signUp } from '@/src/services/auth';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const clearError = () => { setError(''); setSuccess(false); };

  const handleSignup = async () => {
    setError('');
    setSuccess(false);
    if (!firstName || !lastName) {
      setError('Please enter your first and last name.');
      return;
    }
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const credential = await signUp(email, password);
      await updateProfile(credential.user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });
      setSuccess(true);
    } catch (e: any) {
      const code = e?.code;
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.nameRow}>
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="First name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={(t) => { clearError(); setFirstName(t); }}
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, styles.nameInput]}
          placeholder="Last name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={(t) => { clearError(); setLastName(t); }}
          autoCapitalize="words"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={(t) => { clearError(); setEmail(t); }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={(t) => { clearError(); setPassword(t); }}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>Account created! You're being logged in...</Text> : null}
      <Pressable style={styles.button} onPress={handleSignup} disabled={loading || success}>
        <Text style={styles.buttonText}>{loading ? 'Creating account...' : 'Sign Up'}</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#50D8D7',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  nameInput: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#1e2227',
    borderColor: '#50D8D7',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  success: {
    color: '#50D8D7',
    fontSize: 14,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#50D8D7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#50D8D7',
    marginTop: 24,
    fontSize: 14,
  },
});
