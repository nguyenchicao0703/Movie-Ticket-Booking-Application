import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants/index';
import { TextInput } from 'react-native-paper';

const Input = ({ label, editable, value, onChangeText }) => {
    return (
        <View style={styles.groupEmailInput}>
            <TextInput
                style={{
                    backgroundColor: 'transparent',
                    fontFamily: Fonts.Regular,
                }}
                label={label}
                underlineColor="white"
                activeUnderlineColor={Colors.LIGHT_GRAY}
                underlineStyle={{ borderColor: 'white' }}
                cursorColor={Colors.DARK_RED}
                keyboardType="text"
                textColor={Colors.DEFAULT_WHITE}
                onChangeText={onChangeText}
                editable={editable}
                value={value}
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
        backgroundColor: Colors.DEFAULT_BLACK,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});
