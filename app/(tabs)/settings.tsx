import { useState, useEffect } from 'react';
import { StyleSheet, Switch, Text, View, ScrollView, Pressable } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/src/config/firebaseConfig';
import { logOut } from '@/src/services/auth';

export default function SettingsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [useMetric, setUseMetric] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Logged in as</Text>
          <Text style={styles.value} numberOfLines={1}>{user?.email ?? '—'}</Text>
        </View>
        <Pressable style={styles.logoutButton} onPress={logOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#444', true: '#50D8D7' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#444', true: '#50D8D7' }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Use Metric Units</Text>
          <Switch
            value={useMetric}
            onValueChange={setUseMetric}
            trackColor={{ false: '#444', true: '#50D8D7' }}
            thumbColor="#fff"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  content: {
    padding: 24,
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 28,
  },
  section: {
    backgroundColor: '#1e2227',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#50D8D7',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#2e3340',
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  value: {
    color: '#888',
    fontSize: 14,
    maxWidth: '55%',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6b6b',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff6b6b',
    fontSize: 15,
    fontWeight: '600',
  },
});
