import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';

const FileList = () => {
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        // Replace with the path of the folder you want to read
        const folderPath = `/Users/janahan/Library/Developer/CoreSimulator/Devices/68D55533-B63F-4D18-86A1-CC212FC8FF14/data/Containers/Data/Application/B45DB442-E6E5-4BC1-A507-1424E80492F8/Documents/ExponentExperienceData/@anonymous/joyous-orange-bananas-a8252ddd-17e5-412d-b0a2-7506f9db0674/assets/audio-files`;
        
        // Read the contents of the directory
        const files = await FileSystem.readDirectoryAsync(folderPath);
        
        // Update the state with the file names
        setFileNames(files);
      } catch (error) {
        console.error('Error reading directory:', error);
      }
    };

    getFiles();
  }, []);

  return (
    <View>
      <FlatList
        data={fileNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default FileList;