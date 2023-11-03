import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { PaymentImage, Colors, Fonts } from '../constants';

const ZaloPayment = () => {
    return (
        <Pressable>
            <View style={[styles.bar]}>
                <Image style={styles.img} source={PaymentImage[0].image} />
                <Image style={styles.img} source={PaymentImage[1].image} />
            </View>
        </Pressable>
    );
};

export default ZaloPayment;

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
});
