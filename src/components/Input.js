import {
    StyleSheet,
    useWindowDimensions,
    Text,
    View,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts } from '../constants/index';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
const Input = ({
    label,
    editable,
    value,
    onChangeText,
    keyboardType,
    style,
    placeholder,
}) => {
    const { height, width, scale, fontScale } = useWindowDimensions();

    return (
        <View style={[styles.groupEmailInput, {}]}>
            <TextInput
                placeholder={placeholder}
                style={[
                    {
                        backgroundColor: 'transparent',
                        fontFamily: Fonts.Regular,
                        fontSize: height * 0.021,
                        height: height * 0.075,
                    },
                    { style },
                ]}
                label={label}
                activeUnderlineColor={Colors.LIGHT_GRAY}
                underlineStyle={{ backgroundColor: 'transparent' }}
                cursorColor={Colors.DARK_RED}
                textColor={Colors.DEFAULT_WHITE}
                onChangeText={onChangeText}
                editable={editable}
                value={value}
                keyboardType={keyboardType}
            ></TextInput>
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    groupEmailInput: {
        width: '100%',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.DEFAULT_WHITE,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
});
