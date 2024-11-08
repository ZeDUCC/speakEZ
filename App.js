import { React } from 'react';
import { Text } from 'react-native';
import { DMSans_400Regular, DMSans_400Regular_Italic, DMSans_500Medium, DMSans_500Medium_Italic, DMSans_700Bold, DMSans_700Bold_Italic } from "@expo-google-fonts/dm-sans";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RecordScreen from './screens/RecordScreen';
import SettingsScreen from './screens/SettingsScreen';
import GenerateScriptScreen from './screens/GenerateScriptScreen';
import RecordingListScreen from './screens/RecordingListScreen';
import TestScreen from './screens/TestScreen';
import TranscriptScreen from './screens/TranscriptScreen';
import BrainstormChatScreen from './screens/BrainstormChatScreen';
import OllamaTestScreen from './screens/OllamaTestScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic,
    });

    
    

    return (
        // START API/TRANSCRIPT-FUNC/TEST.PY FIRST

        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Recording" component={RecordScreen} />
                <Stack.Screen name="Generating" component={GenerateScriptScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="RecordingList" component={RecordingListScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="Transcript" component={TranscriptScreen} />
                <Stack.Screen name="BrainstormChat" component={BrainstormChatScreen} />
                <Stack.Screen name="OllamaTest" component={OllamaTestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};