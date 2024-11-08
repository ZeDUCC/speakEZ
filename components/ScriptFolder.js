import React from 'react';
import { View, FlatList, Text, StyleSheet, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { DMSans_700Bold,} from "@expo-google-fonts/dm-sans";
import ScriptBox from './ScriptBox';

const ScriptFolder = props => {
    const businessData = [
        {key: "investor pitch", body: "Good afternoon, everyone. Thank you for taking the time to meet with me today. My name is Alex, and I’m excited to introduce you to MoodMate, a revolutionary app designed to enhance mental well-being through personalized mood tracking and AI-driven emotional support."},
        {key: "business proposal", body: "In today’s fast-paced world, mental health is a growing concern. Over 45% of adults experience emotional distress, yet many don’t have access to the support they need. Traditional therapy can be expensive, and self-help tools are often generic, failing to address individual needs."},
        {key: "elevator pitch", body: "MoodMate is a mobile app that provides users with real-time emotional support tailored to their unique experiences. By leveraging AI and machine learning, MoodMate analyzes user inputs—such as mood logs, daily activities, and social interactions—to offer personalized advice, relaxation techniques, and mood-enhancing exercises."}];
    
    const personalData = [
        {key: "intro", body: "Hi, I’m Janahan! I’m currently in my third year studying mechatronics engineering, and I’m really into all things tech. Outside of academics, I spend a lot of time exploring new tech trends, tinkering with code, and staying active in the digital community. I’m passionate about learning new things and connecting with like-minded people."},
        {key: "icebreaker", body: "Hey, I’m Janahan, or Jan for short. I’m a huge fan of sci-fi movies—there’s nothing like a good plot twist to keep you on your toes. What’s the last movie that really blew your mind?"}];

    return (
        <FlatList data={props.title == 'business' ? businessData : personalData} horizontal={true} renderItem={({item}) => <ScriptBox navigation={props.navigation} body={item.body} title={item.key} />}></FlatList>
    )
}

export default ScriptFolder;