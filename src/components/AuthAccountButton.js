import { Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const AuthAccountButton = ({ onPress, text }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, { height: height * 0.05 }]}
        >
            <Text style={[styles.text1, { fontSize: height * 0.02 }]}>
                {text}
            </Text>
        </Pressable>
    );
};

export default AuthAccountButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DARK_RED,
        width: '95%',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 30,
    },
    text1: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        fontSize: 16,
    },
});
