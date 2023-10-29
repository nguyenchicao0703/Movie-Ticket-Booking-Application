import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants';

const TabTopBar = ({ text, style }) => {
    return (
        <View style={[styles.tabBottomText, { style }]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default TabTopBar;

const styles = StyleSheet.create({
    tabBottomText: {
        backgroundColor: Colors.DARK_INDIGO,
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        padding: 8,
    },
    text: {
        fontSize: 18,
        fontFamily: Fonts.SemiBold,
        color: Colors.LIGHT_GRAY,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});
