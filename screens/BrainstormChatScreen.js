import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import axios from 'axios';

function BrainstormChatScreen() {

    const [response, setResponse] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await axios.post('http://localhost:11434/api/generate', {
                        "model": "llama3",
                        "prompt": "Hello",
                    });
                    setResponse(res.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }, []);

    return (
        <SafeAreaView>
            <Text style={{color: 'black'}}>{response}</Text>
        </SafeAreaView>
    );
};

export default BrainstormChatScreen;