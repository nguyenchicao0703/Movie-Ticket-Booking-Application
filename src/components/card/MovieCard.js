import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const MovieCard = ({ data, listCase }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 14;
    const navigation = useNavigation();

    const handleButtonMovieCard = () => {
        navigation.navigate('Detail', { id: data.id_phim });
        console.log(data.id_phim);
    };

    const navigateMovieToShowtimeMovie = () => {
        listCase !== 'TicketHistory'
            ? navigation.navigate('ShowtimeMovie', { id: data.id_phim })
            : null;
        console.log({ listCase });
    };

    return (
        <Pressable
            style={{
                backgroundColor: Colors.DARK_BG,
                marginTop: 25,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
                paddingBottom: 25,
                width: '95%',
                alignSelf: 'center',
            }}
            onPress={handleButtonMovieCard}
        >
            <Image
                source={{ uri: data.hinhanh }}
                style={{
                    width: width * 0.32,
                    height: height * 0.28,
                    borderRadius: 5,
                }}
            />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        fontSize: fontScale * 16,
                        fontFamily: Fonts.Bold,
                        maxWidth: width / 2 + 30,
                    }}
                    numberOfLines={1}
                >
                    {data.ten_phim}
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    Thời lượng: {data.thoiluong}
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    Khởi chiếu: {data.ngaykhoichieu}
                </Text>
                <Text style={[styles.text, { fontSize }]} numberOfLines={2}>
                    Thể loại: {data.theloai}
                </Text>
                <LinearGradient
                    colors={
                        listCase === 'TicketHistory'
                            ? [Colors.LIGHT_GRAY, Colors.LIGHT_GRAY]
                            : [Colors.DARK_RED, '#FF6666']
                    }
                    locations={[0.35, 1]}
                    style={{
                        width: width * 0.5 - 50,
                        height: width * 0.1 + 5,
                        justifyContent: 'center',
                        borderRadius: 40,
                        marginTop: 10,
                    }}
                >
                    <Pressable onPress={navigateMovieToShowtimeMovie}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: Colors.DEFAULT_WHITE,
                                fontFamily: Fonts.Medium,
                                fontSize: fontScale * 16,
                            }}
                        >
                            {listCase === 'TicketHistory'
                                ? 'Đã lên lịch'
                                : 'Đặt vé'}
                        </Text>
                    </Pressable>
                </LinearGradient>
            </View>
            {/* <View
                style={{
                    width: '95%',
                    marginTop: 20,
                    height: 1,
                    backgroundColor: Colors.MEDIUM_GRAY_LINE,
                    alignSelf: 'center',
                    opacity: 0.5,
                }}
            /> */}
        </Pressable>
    );
};

export default MovieCard;

const styles = StyleSheet.create({
    text: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        marginTop: 10,
    },
});
