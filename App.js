import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

// Create tab navigator
const Tab = createBottomTabNavigator();

// Screen 1: Form to collect book details
function BookForm({ addBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isPressed, setIsPressed] = useState(false); // For hover-like effect

  const handleSubmit = () => {
    if (title && author && genre) {
      // Add the new book details
      addBook({ title, author, genre });
      alert('Book added! Switch to the "View Details" tab to see the entries.');
      // Clear the form
      setTitle('');
      setAuthor('');
      setGenre('');
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Book Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter book title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Author:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter author name"
        value={author}
        onChangeText={setAuthor}
      />

      <Text style={styles.label}>Genre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter genre"
        value={genre}
        onChangeText={setGenre}
      />

      <Pressable
        onPressIn={() => setIsPressed(true)}   // Press effect (like hover)
        onPressOut={() => setIsPressed(false)} // Reset when released
        onPress={handleSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed || isPressed ? styles.buttonPressed : styles.buttonNormal,
        ]}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

// Screen 2: Display the list of submitted book details
function DisplayBooks({ books }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {books.length > 0 ? (
        books.map((book, index) => (
          <View key={index} style={styles.resultContainer}>
            <Text style={styles.result}>Book Title: {book.title}</Text>
            <Text style={styles.result}>Author: {book.author}</Text>
            <Text style={styles.result}>Genre: {book.genre}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.result}>No book details available. Please add some in the form.</Text>
      )}
    </ScrollView>
  );
}

// App component with tab navigation
export default function App() {
  const [books, setBooks] = useState([]);

  // Function to add a new book to the list
  const addBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="BookForm">
          {() => <BookForm addBook={addBook} />}
        </Tab.Screen>
        <Tab.Screen name="DisplayBooks">
          {() => <DisplayBooks books={books} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonNormal: {
    backgroundColor: '#007BFF',
  },
  buttonPressed: {
    backgroundColor: '#0056b3', // Darker shade on press (hover effect)
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  result: {
    fontSize: 18,
    marginVertical: 4,
  },
});
