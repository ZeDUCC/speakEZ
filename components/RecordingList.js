import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated} from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const RecordingList = props => {

    const fadeHeight = useRef(new Animated.Value(300)).current;
    const fadeOpacity = useRef(new Animated.Value(0)).current;

    const fadeMainOpacity = useRef(new Animated.Value(0)).current;
    const fadeMainWidth = useRef(new Animated.Value(200)).current;

    const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    const triggerListAnimation = () => {
        Animated.sequence([
            Animated.delay(1000),
            Animated.parallel([
                Animated.timing(fadeHeight, {
                    toValue: 10,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(fadeOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                })
            ])
        ]).start();
    };

    const triggerMainAnimation = () => {
        Animated.sequence([
            Animated.timing(fadeMainOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.delay(100),
            Animated.timing(fadeMainWidth, {
                toValue: 300,
                duration: 250,
                useNativeDriver: false,
            })
        ]).start();
    };

    useEffect(() => {
        triggerMainAnimation();
        triggerListAnimation();
    })

    const [mostRecentFile, setMostRecentFile] = useState(null);
    const [otherFiles, setOtherFiles] = useState([]);

    useEffect(() => {

        const getFiles = async () => {
            try {
            const folderPath = `${FileSystem.documentDirectory}assets/audio-files`;
            const files = await FileSystem.readDirectoryAsync(folderPath);

            const fileInfoPromises = files.map(async (fileName) => {
                const info = await FileSystem.getInfoAsync(`${folderPath}/${fileName}`);
                return {name: fileName, modificationTime: info.modificationTime};
            });

            const filesInfo = await Promise.all(fileInfoPromises);

            const filteredFiles = filesInfo.filter(file => file.name.endsWith('.m4a'));

            filteredFiles.sort((a, b) => b.modificationTime - a.modificationTime);

            const [mostRecent, ...others] = filteredFiles;

            setMostRecentFile(mostRecent.name);
            setOtherFiles(others.map((file) => file.name));
            } catch (error) {
            console.error('Error reading files: ' + error);
            }
        };

        getFiles();
    }, []);

    const openPage = async (fileName) => {
        try {
            const fileUri = `${FileSystem.documentDirectory}assets/audio-files/${fileName}`;
            const file = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                type: 'audio/m4a',
                name: fileName
            });

            const response = await axios.post('http://127.0.0.1:5000/transcribe-test', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const text = response.data.transcript;
            props.navigation.navigate('Transcript', { body: text });
        } catch (error) {
            console.error('Error making POST request: ' + error);
        }
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {mostRecentFile && (
            <AnimatedOpacity
                onPress={() => {
                    openPage(mostRecentFile);
                }}
                style={{
                    backgroundColor: '#D9D9D9',
                    marginTop: fadeHeight,
                    marginBottom: 10,
                    padding: 20,
                    borderRadius: 15,
                    width: fadeMainWidth,
                    opacity: fadeMainOpacity,
                }}
            >
    <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: 20, color: '#161616' }}>
        {mostRecentFile}
    </Text>
</AnimatedOpacity>
        )}
        <Animated.FlatList style={{ width: 300, marginTop: 0, borderRadius: 15, opacity: fadeOpacity }} data={otherFiles} keyExtractor={(item) => item} renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openPage(item)} style={{ backgroundColor: '#303030', marginBottom: 10, padding: 20, borderRadius: 15, }}>
                <Text style={{ fontFamily: 'DMSans_700Bold', fontSize: 20, color: '#fff' }}>{item}</Text>
            </TouchableOpacity>
            )} />
        </View>
    );
};

export default RecordingList;