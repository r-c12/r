import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { bmi } = route.params;

  // Function to determine BMI status
  const getBMIStatus = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) {
      return 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  };

  const bmiStatus = getBMIStatus(bmi);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your BMI is {bmi}</Text>
      <Text style={styles.statusText}>You are classified as: {bmiStatus}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
  },
});
