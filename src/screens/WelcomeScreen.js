import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import React from 'react';
import { Images, Fonts, Colors, BottomTabImage } from '../constants';
const WelcomeScreen = ({ navigation }, props) => {
    setTimeout(() => {
        navigation.navigate('Drawer');
    }, 2500);
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <ImageBackground style={styles.loginImage} source={Images[4].image}>
                <View style={styles.child} />
            </ImageBackground>
            <Image style={styles.logoImage} source={BottomTabImage[5].image} />
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: '45%',
        height: '24%',
        position: 'absolute',
    },
    loginImage: {
        width: '100%',
        height: '100%',
    },
});
