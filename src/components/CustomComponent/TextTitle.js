import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants';
const TextTitle = ({ text }) => {
    return (
        <View>
            <Text style={styles.textTitle}>{text}</Text>
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
