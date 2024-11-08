import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, Text } from 'react-native';
import axios from 'axios';
import backgroundImage from '../assets/main-background.png';
import styles from '../Styles';

function OllamaTestScreen({ navigation }) {
    const [reply, setReply] = useState('');

    const getResponse = async (textInputPrompt) => {
        try {
            const response = await axios.post('http://localhost:5000/ollama-test', {
                prompt: textInputPrompt,
            });

            return response.data.message;
        } catch (error) {
            console.error('Error fetching response:', error);
            return 'Error fetching response';
        }
    };

    useEffect(() => {
        const fetchReply = async () => {
            const message = await getResponse("Hello, how are you doing today?");
            setReply(message);
        };

        fetchReply();
    }, []);

    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#fff', fontSize: 15 }}>{reply}</Text>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default OllamaTestScreen;