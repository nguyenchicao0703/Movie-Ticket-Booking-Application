import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants/index';

const MovieHomeItem = ({ data }) => {
    // console.log({ data });
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={data.image} />
            <Text style={styles.title} numberOfLines={1}>
                {data.name}
            </Text>
            <Text style={styles.time}>{data.time}</Text>
        </View>
    );
};

export default MovieHomeItem;

const styles = StyleSheet.create({
    container: {
        width: 177,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    image: {
        width: 177,
        height: 242,
        borderRadius: 10,
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 16,
        fontFamily: Fonts.Medium,
        marginTop: 6,
        textAlign: 'center',
    },
    time: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 12,
        fontFamily: Fonts.Light,
        textAlign: 'center',
        marginTop: 6,
    },
});
