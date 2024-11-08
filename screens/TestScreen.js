import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import backgroundImage from '../assets/main-background.png';
import ExpandTI from '../components/ExpandTI';
import styles from '../Styles';

function TestScreen({navigation}) {
    // MAKE SURE TO START ./API/MAIN.PY BEFORE RUNNING THE APP

    // const requestData = {
    //     model: 'llama3',
    //     prompt: 'What is the meaning of life?',
    //     stream: false,
    // }

    // const [generatedText, setGeneratedText] = useState('');

    // useEffect(() => {
    //     axios.post('http://127.0.0.1:11434/api/generate', requestData)
    //         .then((res) => {
    //             setGeneratedText(res.data.response);
    //             console.log(generatedText);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         })
    // }, []);

    // return (
    //     <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
    //         <SafeAreaView style={[styles.safeView, { justifyContent: 'center', alignItems: 'center' }]}>
    //             <View>
    //                 <Text>{generatedText}</Text>
    //             </View>
    //         </SafeAreaView>
    //     </ImageBackground>
    // );



    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, { justifyContent: 'center', alignItems: 'center' }]}>
                <View>
                    <ExpandTI navigation={navigation} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default TestScreen;