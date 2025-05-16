import React, { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LogScreen() {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const handleSubmit = () => {
    if (!exercise || !weight || !reps || !sets) {
      Alert.alert('Please fill in all fields');
      return;
    }

    console.log('Exercise logged:', {
      exercise,
      weight,
      reps,
      sets,
    });

    // Reset fields
    setExercise('');
    setWeight('');
    setReps('');
    setSets('');

    Alert.alert('Exercise logged successfully!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Log Your Exercise</Text>

        <TextInput
          style={styles.input}
          placeholder="Exercise name"
          placeholderTextColor="#888"
          value={exercise}
          onChangeText={setExercise}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Reps"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={reps}
          onChangeText={setReps}
        />
        <TextInput
          style={styles.input}
          placeholder="Sets"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={sets}
          onChangeText={setSets}
        />

        <View style={styles.buttonContainer}>
          <Button title="Log Exercise" onPress={handleSubmit} color="#50D8D7" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
