// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StudentProvider } from './StudentContext'; // Import the StudentProvider
import StudentForm from './screens/StudentForm';
import StudentDetails from './screens/StudentDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StudentProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StudentForm">
          <Stack.Screen name="StudentForm" component={StudentForm} />
          <Stack.Screen name="StudentDetails" component={StudentDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </StudentProvider>
  );
}
