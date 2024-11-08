import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, } from 'react-native';

const ScriptBox = props => {

    const openPage = () => {
        props.navigation.navigate('Transcript', {body: props.body});
    }

    return (
        <TouchableOpacity onPress={openPage}>
            <View style={styles.scriptBox}>
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    scriptBox: {
        width: 150,
        height: 170,
        backgroundColor: '#d9d9d9',
        borderRadius: 25,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 15,
        marginRight: 15
    },
    title: {
        fontSize: 15,
        color: "#727272",
        fontFamily: "DMSans_700Bold",
    }
});

export default ScriptBox;