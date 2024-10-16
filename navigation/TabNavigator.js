import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationForm from '../components/RegistrationForm';
import FileUpload from '../components/FileUpload';
import StudentList from '../components/StudentList';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Register" component={RegistrationFormWithCallback} />
      <Tab.Screen name="Students" component={StudentList} />
    </Tab.Navigator>
  );
};

// Wrap the RegistrationForm to pass the onRegistered callback
const RegistrationFormWithCallback = () => {
  const [refresh, setRefresh] = React.useState(false);

  const handleRegistered = () => {
    setRefresh((prev) => !prev); // Trigger re-render
  };

  return <RegistrationForm onRegistered={handleRegistered} />;
};

export default TabNavigator;
