import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  useColorScheme,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [currentTime, setCurrentTime] = useState(''); // State for current time
  const [timer, setTimer] = useState(0); // State for timer in seconds
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [inputValue, setInputValue] = useState(''); // State for timer input

  // Function to toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Function to update current time every second
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0]; // Get time in HH:MM:SS
    setCurrentTime(timeString);
  };

  // Function to start timer
  const startTimer = () => {
    const seconds = parseInt(inputValue);
    if (!isNaN(seconds) && seconds > 0) {
      setTimer(seconds);
      setModalVisible(false);
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            alert('Time is up!');
            return 0; // Reset timer
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      alert('Please enter a valid number');
    }
  };

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval); // Cleanup interval
  }, []);

  return (
    <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      <Text style={styles.timeText}>{currentTime}</Text>
      <Button title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} onPress={toggleDarkMode} />
      
      <Button title="Set Timer" onPress={() => setModalVisible(true)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter time in seconds"
            keyboardType="numeric"
            onChangeText={setInputValue}
            value={inputValue}
          />
          <Button title="Start Timer" onPress={startTimer} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      
      {timer > 0 && <Text style={styles.timerText}>Timer: {timer}s</Text>}
    </View>
  );
};

// Styles for the application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  light: {
    backgroundColor: '#fff',
  },
  dark: {
    backgroundColor: '#333',
  },
  timeText: {
    fontSize: 48,
    marginBottom: 20,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 24,
    marginTop: 20,
    color: '#000',
  },
});

export default App;
