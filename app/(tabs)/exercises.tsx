import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const categories = [
  'Arms',
  'Back',
  'Chest',
  'Core',
  'Legs',
  'Shoulders',
];

export default function ExercisesScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Exercises</Text>
        <View style={styles.centeredRow}>
          <TextInput
            style={styles.input}
            placeholder="Search exercises..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Category:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              dropdownIconColor="#fff"
              mode="dropdown"
              itemStyle={styles.pickerItem}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} color="#fff" />
              ))}
            </Picker>
          </View>
        </View>
        {/* ...existing code... */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  centeredRow: {
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 0,
    width: '90%',
    textAlign: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropdownLabel: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 48,
    width: '100%',
    backgroundColor: '#333',
  },
  pickerItem: {
    color: '#fff',
    backgroundColor: '#333',
    fontSize: 16,
  },
});
