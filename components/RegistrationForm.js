import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // For image upload functionality

export default function RegistrationForm({ navigation }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState(''); // Added DOB
  const [course, setCourse] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [students, setStudents] = useState([]);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    loadStudents(); // Load existing students
  }, []);

  // Load students from AsyncStorage
  const loadStudents = async () => {
    try {
      const studentsJson = await AsyncStorage.getItem('students');
      const studentsData = studentsJson ? JSON.parse(studentsJson) : [];
      setStudents(studentsData);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  // Handle image picking
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    const newStudent = { name, phoneNumber, address, age, dob, course, photoUri };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);

    // Save to AsyncStorage
    const jsonContent = JSON.stringify(updatedStudents, null, 2);
    try {
      await AsyncStorage.setItem('students', jsonContent);
      console.log('Registration saved to storage.');
      alert('Student registered successfully!');
    } catch (error) {
      console.error('Error saving to storage:', error);
      alert('Error saving registration.');
    }

    // Reset the form fields
    setName('');
    setPhoneNumber('');
    setAddress('');
    setAge('');
    setDob(''); // Reset DOB
    setCourse('');
    setPhotoUri(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.title}>College Admission Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
        />
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />

        <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
          <Text style={styles.photoButtonText}>
            {photoUri ? "Change Photo" : "Upload Photo"}
          </Text>
        </TouchableOpacity>

        {photoUri && (
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
        )}

        <Button title="Register" onPress={handleRegister} />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  photoButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});
