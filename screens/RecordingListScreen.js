import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import RecordingList from '../components/RecordingList';
import backgroundImage from '../assets/main-background.png';
import styles from '../Styles';

function RecordingListScreen({navigation}) {
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, {justifyContent: 'center', alignItems: 'center'}]}>
                <RecordingList navigation={navigation} />
            </SafeAreaView>
        </ImageBackground>
    )
};

export default RecordingListScreen;