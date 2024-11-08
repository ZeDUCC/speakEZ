import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import  OptionsButton from '../components/OptionsButton';
import MainTwo from '../components/MainTwo';
import ScriptFolder from '../components/ScriptFolder';
import styles from '../Styles';
import backgroundImage from '../assets/main-background.png';

function HomeScreen({ navigation }) {
    return (
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
            <SafeAreaView style={styles.safeView}>
                <ScrollView>
                    <OptionsButton navigation={navigation}/>
                    <View style={styles.heroTextDiv}>
                        <Text style={styles.heroText}>Welcome,{'\n'}Janahan!</Text>
                    </View>
                    <View style={styles.mainTwoDiv}>
                        <MainTwo title="Record an existing script" emoji="🎙️" navigation={navigation} />
                        <MainTwo title="Generate a new script" emoji="🧠" navigation={navigation} />
                    </View>
                    <View style={styles.folder}>
                        <Text style={[styles.dmSans, {color: "#fff", padding: 4, marginBottom: 10, fontSize: 20}]}>📁 business</Text>
                        <View style={{flexDirection: 'row'}}>
                            <ScriptFolder title="business" navigation={navigation} />
                        </View>
                    </View>
                    <View style={styles.folder}>
                        <Text style={[styles.dmSans, {color: "#fff", padding: 4, marginBottom: 10, fontSize: 20}]}>📁 personal</Text>
                        <View style={{flexDirection: 'row'}}>
                            <ScriptFolder title="personal" navigation={navigation} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
};

export default HomeScreen;