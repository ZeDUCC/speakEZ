import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import ExpandTI from '../components/ExpandTI';
import backgroundImage from '../assets/main-background.png';
import styles from '../Styles';

function GenerateScriptScreen({navigation}) {
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, {alignItems: 'center'}]}>
                <ExpandTI />
            </SafeAreaView>
        </ImageBackground>
    )
};

export default GenerateScriptScreen;