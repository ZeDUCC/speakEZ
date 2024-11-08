import React, { useState, useRef } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Animated, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../Styles';
import axios from 'axios';

const ExpandTI = (props) => {
    const [text, setText] = useState('What\'s the topic?');
    const [filteredData, setFilteredData] = useState([]);
    const fadeExpand = useRef(new Animated.Value(200)).current; // Initial width value
    const fadeHeight = useRef(new Animated.Value(300)).current; // Initial marginTop value
    const fadeOpacity = useRef(new Animated.Value(0)).current; // Initial opacity value
    const [animated, setAnimated] = useState(false);
    const listData = [
        { key: '🧠 Brainstorm a pitch' },
        { key: '🤝 Help me with first impressions' },
        { key: '🙋‍♂️ Confidently asking questions' },
        { key: '🙊 Help with stuttering' },
        { key: '🐢 Talking slowly with intent' },
        { key: '🧳 Business negotiation tips' }
    ];

    const triggerAnimation = () => {
        if (!animated) {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(fadeExpand, {
                        toValue: 300,
                        duration: 450,
                        useNativeDriver: false,
                    }),
                    Animated.timing(fadeHeight, {
                        toValue: 10,
                        duration: 450,
                        useNativeDriver: false,
                    }),
                ]),
                Animated.timing(fadeOpacity, {
                    toValue: 1,
                    duration: 450,
                    useNativeDriver: false
                }),
            ]).start();
            setAnimated(true);
        }
    };

    const jaroWinklerDistance = (s1, s2) => {
        const m = 0.1; // scaling factor
        const l = 4; // length of common prefix at the start of the string up to a maximum of 4 characters

        const jaroDistance = (s1, s2) => {
            const s1Len = s1.length;
            const s2Len = s2.length;

            if (s1Len === 0) return s2Len === 0 ? 1 : 0;

            const matchDistance = Math.floor(Math.max(s1Len, s2Len) / 2) - 1;

            const s1Matches = new Array(s1Len).fill(false);
            const s2Matches = new Array(s2Len).fill(false);

            let matches = 0;
            let transpositions = 0;

            for (let i = 0; i < s1Len; i++) {
                const start = Math.max(0, i - matchDistance);
                const end = Math.min(i + matchDistance + 1, s2Len);

                for (let j = start; j < end; j++) {
                    if (s2Matches[j]) continue;
                    if (s1[i] !== s2[j]) continue;
                    s1Matches[i] = true;
                    s2Matches[j] = true;
                    matches++;
                    break;
                }
            }

            if (matches === 0) return 0;

            let k = 0;
            for (let i = 0; i < s1Len; i++) {
                if (!s1Matches[i]) continue;
                while (!s2Matches[k]) k++;
                if (s1[i] !== s2[k]) transpositions++;
                k++;
            }

            return ((matches / s1Len) + (matches / s2Len) + ((matches - transpositions / 2) / matches)) / 3;
        };

        const jaro = jaroDistance(s1, s2);

        let prefix = 0;
        for (let i = 0; i < Math.min(l, s1.length, s2.length); i++) {
            if (s1[i] === s2[i]) prefix++;
            else break;
        }

        return jaro + (prefix * m * (1 - jaro));
    };

    const handleSubmit = () => {
        const filtered = listData
            .map(item => ({
                ...item,
                score: jaroWinklerDistance(item.key.toLowerCase(), text.toLowerCase())
            }))
            .filter(item => item.score > 0.7 || item.key.toLowerCase().includes(text.toLowerCase())) // Filter out items that are too different
            .sort((a, b) => b.score - a.score); // Sort by score in descending order

        setFilteredData(filtered);
    };

    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Animated.View style={[styles.inputBox, { width: fadeExpand, marginTop: fadeHeight }]}>
                    <TextInput
                        value={text}
                        onChangeText={(newText) => setText(newText)}
                        onFocus={triggerAnimation}
                        onSubmitEditing={handleSubmit}
                        multiline={false}
                        style={{ color: 'rgba(256, 256, 256, 0.6)', fontSize: 15, width: '100%', minHeight: 50, backgroundColor: '#000', textAlign: 'center', fontFamily: 'DMSans_700Bold', padding: 10 }}
                    />
                </Animated.View>
            </View>
            <Animated.FlatList
                style={{ width: 300, marginTop: 20, borderRadius: 15, opacity: fadeOpacity }}
                data={filteredData.length > 0 ? filteredData : listData}
                renderItem={({ item }) => (
                    <TouchableOpacity requestData={{model: 'qwen2:0.5b', prompt: item.key, stream: false}} 
                        onPress={() => {
                            axios.post('http://127.0.0.1:11434/api/generate', { model: 'phi3', prompt: item.key, stream: false })
                                .then((res) => {
                                    console.log('clicked');
                                    props.navigation.navigate('Transcript', { body: res.data.response });
                                })
                            }
                        }
                        style={{ backgroundColor: '#303030', marginBottom: 10, padding: 20, borderRadius: 15 }}>
                        <Text numberOfLines={1} style={{ fontFamily: 'DMSans_700Bold', fontSize: 20, color: '#fff' }}>{item.key}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

export default ExpandTI;