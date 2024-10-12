import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  const clearForm = () => {
    setName('');
    setEmail('');
    setCourse('');
    setRating('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (name.length < 3 || name.length > 50) {
      Alert.alert('Validation Error', 'Name should be between 3 and 50 characters.');
      return false;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }

    if (rating < 1 || rating > 5) {
      Alert.alert('Validation Error', 'Rating must be between 1 and 5.');
      return false;
    }

    if (!course) {
      Alert.alert('Validation Error', 'Please enter a course.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const feedback = { id: Date.now().toString(), name, email, course, rating };
      setFeedbacks([...feedbacks, feedback]);
      clearForm();
      Alert.alert('Success', 'Feedback submitted successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        maxLength={50}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Course:</Text>
      <TextInput
        style={styles.input}
        value={course}
        onChangeText={setCourse}
        placeholder="Enter the course name"
      />

      <Text style={styles.label}>Rating (1-5):</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Enter your rating"
        keyboardType="numeric"
        maxLength={1}
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Clear" onPress={clearForm} />

      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text style={styles.feedbackText}>
              {item.name} ({item.course}): {item.rating}/5
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  feedbackItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  feedbackText: {
    fontSize: 16,
  },
});

export default FeedbackForm;
