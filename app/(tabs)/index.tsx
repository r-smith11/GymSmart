import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/src/config/firebaseConfig';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/weights.jpg');

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.name}>{firstName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 3,
  },
  greetingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    color: '#888',
    fontSize: 18,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
