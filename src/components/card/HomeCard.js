import { StyleSheet, Text, Image, Pressable, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants/index';
import { useNavigation } from '@react-navigation/native';

const HomeCard = ({
    data,
    isFirst,
    isLast,
    cardWidth,
    cardHeight,
    nameScale,
    timeScale,
    movieCase,
}) => {
    // console.log({ data });
    const navigation = useNavigation();

    const handleButtonClickItem = () => {
        var idMovie = data.id_phim;
        console.log({ idMovie });
        navigation.navigate('Detail', { id: idMovie });
    };

    return (
        <Pressable
            onPress={handleButtonClickItem}
            style={[
                styles.container,
                isFirst ? { marginLeft: 15 } : isLast ? { marginRight: 0 } : {},
                { maxWidth: cardWidth },
            ]}
            disabled={movieCase === 'movieSpecial'}
        >
            <Image
                style={[styles.image, { width: cardWidth, height: cardHeight }]}
                source={{ uri: data.hinhanh }}
            />
            <Text
                style={[styles.title, { fontSize: nameScale }]}
                numberOfLines={1}
            >
                {data.ten_phim}
            </Text>
            <Text style={[styles.time, { fontSize: timeScale, marginLeft: 3 }]}>
                {data.thoiluong} phút / {data.ngaykhoichieu}
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
