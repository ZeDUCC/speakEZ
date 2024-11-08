import {View, Image, StyleSheet, Text, SafeAreaView, ImageBackground} from 'react-native';
import React from 'react';
import SettingsBox from '../components/SettingsBox';
import backgroundImage from '../assets/main-background.png';
import styles from '../Styles';

function SettingsScreen({navigation}) {
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={[styles.safeView, {justifyContent: 'center', alignItems: 'center'}]}>
                <View style={{flexDirection: 'row'}}>
                    <SettingsBox title={"account"} />
                    <SettingsBox title={"privacy"} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <SettingsBox title={"appearance"} />
                    <SettingsBox title={"language"} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <SettingsBox title={"audio"} />
                    <SettingsBox title={"notifications"} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
};

export default SettingsScreen;