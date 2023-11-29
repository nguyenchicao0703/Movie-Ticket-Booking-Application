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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUsers } from '../redux/slice/usersSlice';

const WelcomeScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    useEffect(() => {}, []);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '243901576266-jcuvlf63l60k3n7qhvdsi66icu86inuu.apps.googleusercontent.com',
        });

        const checkUserLoggedIn = async () => {
            try {
                const user = await AsyncStorage.getItem('user');

                if (user) {
                    // Người dùng đã đăng nhập trước đó
                    dispatch(setUsers(JSON.parse(user)));

                    navigation.navigate('Drawer');

                    // const datamoi = useSelector(usersSelector);
                    // console.log(user);
                } else {
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 2500,
                        useNativeDriver: true,
                    }).start();
                    setTimeout(() => {
                        navigation.navigate('Drawer');
                    }, 3000);
                }
            } catch (error) {
                console.log('Error checking user login status:', error);
            }
        };

        checkUserLoggedIn();
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
