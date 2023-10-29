import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { HeaderImage } from '../../constants';

const BackBtn = ({ onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Image style={{ margin: 10 }} source={HeaderImage[0].image} />
        </Pressable>
    );
};

export default BackBtn;

const styles = StyleSheet.create({});
