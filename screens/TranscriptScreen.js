import {React, useRef, useState, useEffect} from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, View, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../Styles.js';
import backgroundImage from '../assets/main-background.png';

const TranscriptScreen = () => {
    const route = useRoute();
    const { body } = route.params;

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, { alignItems: 'center' }]}>
                <ScrollView>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', marginTop: 10, width: 300, padding: 30, borderRadius: 15}}>
                        <Text style={{color: 'white', fontSize: 15, fontFamily: 'DMSans_700Bold'}}>{body}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default TranscriptScreen;