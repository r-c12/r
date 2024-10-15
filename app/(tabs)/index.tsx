import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks
  const [taskInput, setTaskInput] = useState(''); // State for the current task input
  const [editingIndex, setEditingIndex] = useState(null); // State for the index of the task being edited
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle

  // Function to add or edit a task
  const addOrEditTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? { ...task, name: taskInput } : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null); // Clear editing index after editing
    } else {
      setTasks([...tasks, { name: taskInput, completed: false }]);
    }
    setTaskInput(''); // Clear input field after adding/editing
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Filter out the task to be deleted
  };

  // Function to toggle task completion status
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to start editing a task
  const editTask = (index) => {
    setTaskInput(tasks[index].name); // Populate the input with the task's name
    setEditingIndex(index); // Set the index of the task being edited
  };

  // Function to toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the dark mode state
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.dark : styles.light]}>
      <Button title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} onPress={toggleDarkMode} />
      
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={taskInput}
        onChangeText={setTaskInput}
      />
      <Button title={editingIndex !== null ? "Edit Task" : "Add Task"} onPress={addOrEditTask} />
      
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            style={[styles.taskItem, item.completed && styles.completedTask]} 
            onPress={() => toggleCompletion(index)} // Toggle completion on press
          >
            <Text style={styles.taskText}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => editTask(index)} />
              <Button title="Delete" onPress={() => deleteTask(index)} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()} // Unique key for each item
      />
    </View>
  );
};

// Styles for the application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  light: {
    backgroundColor: '#fff',
    color: '#000',
  },
  dark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    transition: 'background-color 0.3s ease',
  },
  taskText: {
    fontSize: 18,
    flex: 1, // Allow the task text to take available space
  },
  completedTask: {
    backgroundColor: '#d3ffd3', // Light green for completed tasks
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;

