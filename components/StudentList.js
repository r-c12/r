import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const studentsJson = await AsyncStorage.getItem('students');
      const studentsData = studentsJson ? JSON.parse(studentsJson) : [];
      setStudents(studentsData);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            {item.photoUri && (
              <Image source={{ uri: item.photoUri }} style={styles.studentImage} />
            )}
            <Text style={styles.studentText}>{item.name}</Text>
            <Text style={styles.studentText}>{item.phoneNumber}</Text>
            <Text style={styles.studentText}>{item.address}</Text>
            <Text style={styles.studentText}>{item.age}</Text>
            <Text style={styles.studentText}>{item.dob}</Text>
            <Text style={styles.studentText}>{item.course}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  studentItem: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  studentText: {
    fontSize: 16,
  },
  studentImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default StudentList;
