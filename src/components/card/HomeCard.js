import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants/index';

const HomeCard = ({
    data,
    isFirst,
    isLast,
    cardWidth,
    cardHeight,
    nameScale,
    timeScale,
}) => {
    // console.log({ data });
    return (
        <Pressable
            style={[
                styles.container,
                isFirst ? { marginLeft: 15 } : isLast ? { marginRight: 0 } : {},
                { maxWidth: cardWidth },
            ]}
        >
            <Image
                style={[styles.image, { width: cardWidth, height: cardHeight }]}
                source={data.image}
            />
            <Text
                style={[styles.title, { fontSize: nameScale }]}
                numberOfLines={1}
            >
                {data.name}
            </Text>
            <Text style={[styles.time, { fontSize: timeScale }]}>
                {data.time}
            </Text>
        </Pressable>
    );
};

export default HomeCard;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 15,
    },
    image: {
        borderRadius: 10,
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        marginTop: 6,
        textAlign: 'center',
    },
    time: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        textAlign: 'center',
        marginTop: 6,
    },
});
