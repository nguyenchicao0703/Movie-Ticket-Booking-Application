import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
const TextTitle = ({ text }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    return (
        <View>
            <Text style={[styles.textTitle, { fontSize: height * 0.04 }]}>
                {text}
            </Text>
        </View>
    );
};

export default TextTitle;

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 30,
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.Medium,
        marginTop: 30,
    },
});
