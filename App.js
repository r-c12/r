import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign-up and Login forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(''); // Modal message state

  // Store user data in AsyncStorage during sign-up
  const storeUser = async (newUser) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      setModalMessage('Sign-up Successful! User registered successfully.');
      setModalVisible(true); // Show modal
    } catch (error) {
      setModalMessage('Error: Failed to store user data.');
      setModalVisible(true);
    }
  };

  // Validate login credentials with the stored user data
  const checkLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        setModalMessage(`Login Successful! Welcome back, ${email}.`);
      } else {
        setModalMessage('Login Failed: Invalid email or password.');
      }
      setModalVisible(true); // Show modal
    } catch (error) {
      setModalMessage('Error: Failed to retrieve user data.');
      setModalVisible(true);
    }
  };

  // Handle sign-up button click
  const handleSignUp = () => {
    if (email && password) {
      const newUser = { email, password };
      storeUser(newUser);
      setEmail('');
      setPassword('');
    } else {
      setModalMessage('Sign-up Failed: Please enter both email and password.');
      setModalVisible(true);
    }
  };

  // Handle login button click
  const handleLogin = () => {
    if (email && password) {
      checkLogin();
    } else {
      setModalMessage('Login Failed: Please enter both email and password.');
      setModalVisible(true);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: '/assets/butterfly.jpg' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>{isSignUp ? 'Sign Up' : 'Login'}</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button
          title={isSignUp ? 'Sign Up' : 'Login'}
          onPress={isSignUp ? handleSignUp : handleLogin}
        />

        <Button
          title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
          onPress={() => setIsSignUp(!isSignUp)}
        />

        {/* Modal to show the status messages */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background to make input fields readable
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
