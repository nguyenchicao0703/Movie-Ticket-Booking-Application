import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const PaymentDiscount = ({ discount, number, lineBoolean, numberBoolean }) => {
    const { width, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 18;
    return (
        <View
            style={[
                {
                    width: '100%',
                    height: width * 0.15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    borderTopWidth: 0.8,
                    borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
                },
                lineBoolean
                    ? {
                          borderTopWidth: 0.8,
                          borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
                      }
                    : {},
            ]}
        >
            <Text style={[styles.textContent, { fontSize }]}>{discount}</Text>
            <Text style={[styles.textContent, { fontSize }]}>
                {number} {numberBoolean ? null : 'đ'}
            </Text>
        </View>
    );
};

export default PaymentDiscount;

const styles = StyleSheet.create({
    textContent: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Regular,
    },
});
