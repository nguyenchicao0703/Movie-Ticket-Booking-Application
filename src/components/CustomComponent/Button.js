import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts } from '../../constants';

const Button = ({ onPress, text }, props) => {
    return (
        <Pressable onPress={onPress} style={styles.buttonLogin}>
            <Text
                style={{
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.Regular,
                    fontSize: 18,
                }}
            >
                {text}
            </Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    buttonLogin: {
        backgroundColor: Colors.DARK_RED,
        width: '95%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 35,
    },
});
