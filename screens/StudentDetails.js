// screens/StudentDetails.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StudentContext } from '../StudentContext'; // Import the StudentContext

const StudentDetails = ({ navigation }) => {
  const { students } = useContext(StudentContext); // Use context

  const renderItem = ({ item }) => (
    <View style={styles.studentContainer}>
      <Text style={styles.detail}>Student Name: {item.name}</Text>
      <Text style={styles.detail}>Class: {item.className}</Text>
      <Text style={styles.detail}>Age: {item.age}</Text>
      <Text style={styles.detail}>Register Number: {item.registerNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('StudentForm')}
      >
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  studentContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StudentDetails;
