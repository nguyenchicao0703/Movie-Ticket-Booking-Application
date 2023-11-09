import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Fonts, Images } from '../constants';
import { AuthAccountButton } from '../components';
import { useNavigation } from '@react-navigation/native';

const WaitingScreen = () => {
    const [seconds, setSeconds] = useState(60);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            navigation.navigate('Login');
        }
    }, [seconds, navigation]);

    return (
        <ImageBackground
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            source={Images[4].image}
        >
            <Text
                style={{
                    padding: 30,
                    textAlign: 'center',
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 20,
                    fontFamily: Fonts.Medium,
                }}
            >
                Hãy xác nhận email, lượt xác nhận sẽ hết hạn sau
            </Text>
            <Text
                style={{
                    textAlign: 'center',
                    color: Colors.DARK_RED,
                    fontSize: 30,
                    fontFamily: Fonts.Regular,
                }}
            >
                {seconds > 0 ? ` ${seconds}` : ' '}
            </Text>
        </ImageBackground>
    );
};

export default WaitingScreen;

const styles = StyleSheet.create({});
