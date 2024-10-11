import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Picker } from 'react-native';

export default function HomeScreen() {
  const [temperature, setTemperature] = useState('');
  const [unit, setUnit] = useState('Celsius');
  const [convertedTemperature, setConvertedTemperature] = useState(null);

  const handleConvert = () => {
    if (temperature === '') {
      alert('Please enter a temperature value.');
      return;
    }

    let result = 0;
    if (unit === 'Celsius') {
      result = (parseFloat(temperature) * 9 / 5) + 32; // Celsius to Fahrenheit
    } else {
      result = (parseFloat(temperature) - 32) * 5 / 9; // Fahrenheit to Celsius
    }

    setConvertedTemperature(result.toFixed(2));
  };

  return (
    <ImageBackground source={require('./assets/itachi.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Temperature Converter</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter temperature"
          keyboardType="numeric"
          value={temperature}
          onChangeText={setTemperature}
        />

        <Text style={styles.label}>Select Unit:</Text>
        <Picker
          selectedValue={unit}
          style={styles.picker}
          onValueChange={(itemValue) => setUnit(itemValue)}
        >
          <Picker.Item label="Celsius" value="Celsius" />
          <Picker.Item label="Fahrenheit" value="Fahrenheit" />
        </Picker>

        <Button title="Convert" onPress={handleConvert} />

        {convertedTemperature !== null && (
          <Text style={styles.result}>
            Converted Temperature: {convertedTemperature} {unit === 'Celsius' ? 'Fahrenheit' : 'Celsius'}
          </Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
});
