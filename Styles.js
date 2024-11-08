import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        resizeMode: 'cover',
    },
    safeView: {
        flexDirection: 'column',
        flex: 1,
    },
    dmSans: {
        fontFamily: 'DMSans_700Bold',
    },
    heroTextDiv: {
        width: 390,
        height: 120,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    heroText: {
        color: "#fff",
        fontSize: '40px',
        fontFamily: "DMSans_700Bold"
    },
    mainTwoDiv: {
        flexDirection: 'row',
        marginTop: 30,
        padding: 24
    },
    folder: {
        flexDirection: 'column', 
        padding: 24, 
        paddingTop: 10
    },
    inputBox: {
        height: 70,
        backgroundColor: '#000',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
  }
);

export default styles;