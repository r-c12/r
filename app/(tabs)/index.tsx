// App.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Show modal when the countdown reaches zero
      setModalVisible(true);
      setIsRunning(false); // Stop the timer
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [isRunning, time]);

  const startTimer = () => {
    if (!isRunning) { // Start the timer only if it is not already running
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(10);
  };

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const closeModal = () => {
    setModalVisible(false);
    resetTimer(); // Reset timer after closing modal
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme ? styles.darkTheme : styles.lightTheme]}>
      <View style={styles.toggleContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
      <Text style={styles.timerText}>{time}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Stop" onPress={stopTimer} />
        <Button title="Reset" onPress={resetTimer} />
      </View>

      {/* Custom Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Time’s Up!</Text>
            <Text style={styles.modalMessage}>Great job completing the countdown!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Restart Timer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  darkTheme: {
    backgroundColor: '#333333',
    color: '#ffffff',
  },
  timerText: {
    fontSize: 48,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  toggleContainer: {
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalMessage: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;


