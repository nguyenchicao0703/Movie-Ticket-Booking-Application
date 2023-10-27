import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
const Welcome = () => {
    return (
        // <View style={styles.container}>
        //     {/* Emty Backgroud */}
        //     <View style={styles.emtyBackgroud}/>
        //     {/* Logo Image */}
        //     <Image style={styles.logoImage} source={require('../assets/Welcome/Logo.png')} />
        //     {/* darken the image */}
        //     <ImageBackground
        //         style={styles.loginImage}
        //         source={require('../assets/Welcome/login.png')}
        //     >
        //         <View style={styles.child} />
        //     </ImageBackground>

        // </View>

        <View style={styles.container}>
            <ImageBackground
                style={styles.loginImage}
                source={require('../assets/Welcome/WelcomeScreen.png')}
            >
                <View style={styles.child} />
            </ImageBackground>
            <Image
                style={styles.logoImage}
                source={require('../assets/Welcome/Logo.png')}
            />
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
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
