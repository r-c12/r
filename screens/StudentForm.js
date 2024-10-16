// screens/StudentForm.js
import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { StudentContext } from '../StudentContext'; // Import the StudentContext

const StudentForm = ({ navigation }) => {
  const { addStudent } = useContext(StudentContext); // Use context
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [age, setAge] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));
  const [errors, setErrors] = useState({}); // State for error messages
  const [buttonColor, setButtonColor] = useState('#007BFF'); // Initial button color

  // Clear input fields when the component is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setName('');
      setClassName('');
      setAge('');
      setRegisterNumber('');
      setErrors({});
    });

    return unsubscribe;
  }, [navigation]);

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Student name is required.';
    }
    if (!className) {
      newErrors.className = 'Class is required.';
    }
    if (!age) {
      newErrors.age = 'Age is required.';
    } else if (isNaN(age) || age <= 0) {
      newErrors.age = 'Age must be a valid positive number.';
    }
    if (!registerNumber) {
      newErrors.registerNumber = 'Register number is required.';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent submission if there are errors
    }

    const student = { name, className, age, registerNumber };
    addStudent(student); // Add student to context
    navigation.navigate('StudentDetails'); // Navigate to StudentDetails
  };

  const handlePressIn = () => {
    setButtonColor('#0056b3'); // Darker shade when pressed
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Scale down
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setButtonColor('#007BFF'); // Revert back to original color
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Class"
        value={className}
        onChangeText={setClassName}
      />
      {errors.className && <Text style={styles.errorText}>{errors.className}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Register Number"
        value={registerNumber}
        onChangeText={setRegisterNumber}
      />
      {errors.registerNumber && <Text style={styles.errorText}>{errors.registerNumber}</Text>}

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor }]} // Apply button color
          onPress={handleSubmit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default StudentForm;
