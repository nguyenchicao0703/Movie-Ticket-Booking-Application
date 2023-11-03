import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
const PaymentContentBar = ({ content, num }) => {
    return (
        <View style={[styles.bar]}>
            <Text style={[styles.text]}>{content}</Text>
            <Text style={[styles.text]}>{num}</Text>
        </View>
    );
};

export default PaymentContentBar;

const styles = StyleSheet.create({
    bar: {
        backgroundColor: Colors.DARK_BG,
        padding: 10,
        marginTop: '0%',
        borderTopWidth: 0.3,
        borderTopColor: Colors.MEDIUM_GRAY_LINE,
        borderBottomWidth: 0.3,
        borderBottomColor: Colors.MEDIUM_GRAY_LINE,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    text: {
        fontFamily: Fonts.Regular,
        color: Colors.DEFAULT_WHITE,
    },
});
