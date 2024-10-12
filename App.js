import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, Alert } from 'react-native';

const DigitalClock = ({ isDarkMode }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <Text style={[styles.clockText, { color: isDarkMode ? '#fff' : '#000' }]}>
      {formattedTime}
    </Text>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerInput, setTimerInput] = useState('');
  const [timerOffMessage, setTimerOffMessage] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const startTimer = () => {
    const inputValue = parseInt(timerInput);
    if (!isNaN(inputValue) && inputValue > 0) {
      setTimer(inputValue);
      setTimerOffMessage(''); // Reset the message when the timer starts
      setIsModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number of seconds.');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setTimer(0);
            setTimerOffMessage('Timer is off'); // Display the message when the timer runs out
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const themeStyles = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={[styles.container, themeStyles]}>
      <DigitalClock isDarkMode={isDarkMode} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
      <Button title="Set Timer" onPress={() => setIsModalVisible(true)} />
      <Text style={[styles.timerText, { color: textColor }]}>
        Time Remaining: {timer}s
      </Text>

      {timer === 0 && timerOffMessage ? (
        <Text style={[styles.timerOffText, { color: textColor }]}>
          {timerOffMessage}
        </Text>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter time in seconds"
              onChangeText={setTimerInput}
              value={timerInput}
            />
            <Button title="Start Timer" onPress={startTimer} />
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  clockText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 24,
    marginTop: 20,
  },
  timerOffText: {
    fontSize: 18,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 18,
  },
});

export default App;
