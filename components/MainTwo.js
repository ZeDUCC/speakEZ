import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { DMSans_700Bold,} from "@expo-google-fonts/dm-sans";

const MainTwo = props => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate(props.title == 'Record an existing script' ? 'Recording' : 'Generating')}>
            <View style={styles.mainView}>
                <View style={styles.iconBox}>
                    <Text style={{fontSize: 20}}>{props.emoji}</Text>
                </View>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: 160,
        height: 210,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginRight: 24,
        justifyContent: 'flex-end',
        padding: 15
    },
    title: {
        fontFamily: "DMSans_700Bold",
        color: '#000',
        width: 110,
        fontSize: 15
    },
    iconBox: {
        width: 30,
        height: 30,
        borderColor: '#838383', 
        borderWidth: 1, 
        borderRadius: 7, 
        backgroundColor: '#fff', 
        marginBottom: 115,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MainTwo;