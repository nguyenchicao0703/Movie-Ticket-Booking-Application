import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Images, Fonts, Colors, BottomTabImage } from '../constants';
const WelcomeScreen = ({ navigation }, props) => {
    setTimeout(() => {
        navigation.navigate('Drawer');
    }, 2500);
    const { height, width, fonScale, scale } = useWindowDimensions();
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
            <Image
                style={[
                    styles.logoImage,
                    { width: width * 0.37, height: height * 0.19 },
                ]}
                source={BottomTabImage[5].image}
            />
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
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    loginImage: {
        width: '100%',
        height: '100%',
    },
});
