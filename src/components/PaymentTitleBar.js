import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
const PaymentTitleBar = ({ title }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    return (
        <View style={styles.bar}>
            <Text style={[styles.textTitle]}>{title}</Text>
        </View>
    );
};

export default PaymentTitleBar;

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 18,
        fontFamily: Fonts.Regular,
        color: Colors.LIGHT_SILVER,
        textTransform: 'uppercase',
    },
    bar: {
        backgroundColor: Colors.DARK_GRAY,
        padding: 10,
        marginTop: '0%',
    },
});
