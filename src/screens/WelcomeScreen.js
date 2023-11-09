import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    StatusBar,
    useWindowDimensions,
    Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Images, Fonts, Colors, BottomTabImage } from '../constants';

const WelcomeScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            navigation.navigate('Drawer');
        }, 3000);
    }, [fadeAnim, navigation]);

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
            <Animated.Image
                style={[
                    styles.logoImage,
                    {
                        width: width * 0.37,
                        height: height * 0.19,
                        opacity: fadeAnim,
                    },
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
