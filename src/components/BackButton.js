import {
    Pressable,
    Image,
    useWindowDimensions,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { HeaderImage } from '../constants';
const BackButton = ({ onPress }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    return (
        <Pressable onPress={onPress}>
            <Image
                style={{
                    margin: 10,
                }}
                source={HeaderImage[0].image}
            />
        </Pressable>
    );
};

export default BackButton;

const styles = StyleSheet.create({});
