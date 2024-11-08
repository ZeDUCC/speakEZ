import {React, useState} from 'react';
import { Text, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, Image } from 'react-native';
import { DMSans_700Bold,} from "@expo-google-fonts/dm-sans";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import backgroundImage from '../assets/main-background.png';
import recordingButton from '../assets/mic-dark.png';
import recordingButtonLight from '../assets/mic-light.png';
import styles from '../Styles';

function RecordScreen({navigation}) {

    const [recording, setRecording] = useState(null);

    const requestMicrophonePermission = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Microphone permission is required to record audio.');
            return false;
        }
        return true;
    };

    const onStartRecord = async () => {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) return;

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
        } catch (error) {
            console.error('Failed to start recording', error);
        }
    };

    const onStopRecord = async (navigation) => {
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);

            // Define the destination path
            const destinationPath = `${FileSystem.documentDirectory}assets/audio-files/recording-${Date.now()}.m4a`;
    
            // Ensure the directory exists
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}assets/audio-files`, { intermediates: true });
    
            // Move the file to the destination path
            await FileSystem.moveAsync({
                from: uri,
                to: destinationPath,
            });
    
            console.log('Recording moved to', destinationPath);
            setRecording(null);
            navigation.navigate('Test');
            return destinationPath;
        } catch (error) {
            console.log('Failed to stop recording', error);
        }
    };

    const handlePress = async () => {
        if (recording) {
            await onStopRecord();
            navigation.navigate('RecordingList');
        } else {
            await onStartRecord();
        }
    };

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, {alignItems: 'center'}]}>
                <Text numberOfLines={2} style={{color: '#fff', fontSize: 45, fontFamily: "DMSans_700Bold", width: 280, textAlign: 'center', marginTop: 90}}>{recording ? 'Listening...\n' : 'Ready when you are.'}</Text>
                <TouchableOpacity onPress={handlePress}>
                    <Image source={recording ? recordingButtonLight : recordingButton} style={{marginTop: 80}}></Image>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    )
};

export default RecordScreen;