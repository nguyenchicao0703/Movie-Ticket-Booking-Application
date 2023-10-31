import { Text, Pressable } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const AuthAccountButton = ({ onPress, text }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: Colors.DARK_RED,
                width: '90%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 30,
            }}
        >
            <Text
                style={{
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.Medium,
                    fontSize: 16,
                }}
            >
                {text}
            </Text>
        </Pressable>
    );
};

export default AuthAccountButton;
