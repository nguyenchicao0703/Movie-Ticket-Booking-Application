import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const Input = () => {
    return <View style={styles.groupEmailInput}></View>;
};

export default Input;

const styles = StyleSheet.create({
    groupEmailInput: {
        padding: 5,
        width: '90%',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black',
        borderRadius: 10,
    },
    textEmail: {
        color: '#C1C1C1',
        paddingLeft: 10,
        zIndex: 3,
    },
    inputEmail: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderColor: 'white',
        backgroundColor: 'black',
        color: 'white',
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
    },
});
