import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

const settings = require('../assets/settings-2.png');

const OptionsButton = props => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
            <View style={styles.optionsButton}>
                <Image source={settings} style={{width: 40, height: 25}}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    optionsButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        padding: 10,
    }
});

export default OptionsButton;