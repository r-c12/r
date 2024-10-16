import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FileUpload = () => {
  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      console.log('File uploaded:', result);
      // Handle file upload logic
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Document" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FileUpload;
