import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const calculateBMI = () => {
    if (weight && height && !isNaN(weight) && !isNaN(height)) {
      const bmi = (
        parseFloat(weight) /
        (parseFloat(height) * parseFloat(height))
      ).toFixed(2);

      console.log("Calculated BMI:", bmi);
      navigation.navigate("Result", { bmi });

    } else {
      Alert.alert("Input Error", "Please enter valid height and weight!");
    }
  };

  return (
    <ImageBackground
      source={require("./assets/obito.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter height in meters"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <Button title="Calculate BMI" onPress={calculateBMI} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});
