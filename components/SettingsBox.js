import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const SettingsBox = props => {
    return (
        <TouchableOpacity>
            <View style={styles.scriptBox}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    scriptBox: {
        width: 160,
        height: 170,
        backgroundColor: '#454545',
        borderRadius: 25,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 15,
        margin: 10,
    },
    title: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "DMSans_700Bold",
    }
});

export default SettingsBox;