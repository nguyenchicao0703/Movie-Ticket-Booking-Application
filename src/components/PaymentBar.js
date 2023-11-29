import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const PaymentBar = ({ content, number, lineBoolean, numberBoolean }) => {
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
                },
                lineBoolean
                    ? {
                          borderBottomWidth: 0.8,
                          borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
                      }
                    : {},
            ]}
        >
            <Text style={[styles.textContent, { fontSize }]}>{content}</Text>
            <Text style={[styles.textContent, { fontSize }]}>
                {number} {numberBoolean ? 1 : null}
            </Text>
        </View>
    );
};

export default PaymentBar;

const styles = StyleSheet.create({
    textContent: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Regular,
    },
});
