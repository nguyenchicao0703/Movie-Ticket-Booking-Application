import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const InformationBottom = ({ nameMovie, seat, totalPayment, onPress }) => {
    return (
        <View
            style={{
                width: '100%',
                height: 80,
                backgroundColor: Colors.DEFAULT_WHITE,
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    color: Colors.DEFAULT_BLACK,
                    fontSize: 16,
                    fontFamily: Fonts.Bold,
                    marginLeft: 15,
                    maxWidth: 240,
                }}
                numberOfLines={1}
            >
                {nameMovie}
            </Text>
            <Text
                style={[
                    styles.displayInfomation,
                    { color: Colors.DEFAULT_BLACK },
                ]}
                numberOfLines={1}
            >
                Ghế {seat}
            </Text>
            <Text
                style={[
                    styles.displayInfomation,
                    { color: Colors.DEFAULT_RED },
                ]}
                numberOfLines={1}
            >
                Tạm tính: {totalPayment} đ
            </Text>
            <Pressable
                onPress={onPress}
                style={{
                    width: 120,
                    height: 45,
                    backgroundColor: Colors.DARK_RED,
                    borderRadius: 40,
                    position: 'absolute',
                    right: 10,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        fontSize: 16,
                        textAlign: 'center',
                        fontFamily: Fonts.Medium,
                    }}
                >
                    Tiếp tục
                </Text>
            </Pressable>
        </View>
    );
};

export default InformationBottom;

const styles = StyleSheet.create({
    displayInfomation: {
        fontSize: 14,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
        maxWidth: 240,
    },
});
