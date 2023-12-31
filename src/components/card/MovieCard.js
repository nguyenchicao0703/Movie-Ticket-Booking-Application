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

    var idMovie = data.id_phim;
    var idTicket = data.id_ve;
    // console.log({ idMovie }, { idTicket });

    const handleButtonMovieCard = async () => {
        if (listCase === 'TicketViewed' || listCase === 'TicketUnView') {
            navigation.navigate('Bill', {
                id: idMovie,
                idTicket,
            });
        } else {
            let _listCase =
                listCase === 'moviePresent'
                    ? (_listCase = 'moviePresent')
                    : listCase === 'movieUpcoming'
                    ? 'movieUpcoming'
                    : null;
            navigation.navigate('Detail', {
                id: idMovie,
                idTicket,
                movieCase: _listCase,
            });
        }
        console.log('id phim', data.id_phim);
        console.log('id vé', data.id_ve);
    };

    const navigateMovieToShowtimeMovie = () => {
        listCase === 'moviePresent'
            ? navigation.navigate('ShowtimeMovie', {
                  idMovie: data.id_phim,
                  nameMovie: data.ten_phim,
                  imageMovie: data.hinhanh,
              })
            : listCase === 'TicketViewed' || listCase === 'TicketUnView'
            ? navigation.navigate('Bill', {
                  id: idMovie,
                  idTicket,
              })
            : null;
        // console.log({ listCase });
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
                    numberOfLines={3}
                >
                    {data.ten_phim}
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    Thời lượng: {data.thoiluong} phút
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    {listCase === 'TicketHistory'
                        ? 'Khởi chiếu: ' + data.ngaykhoichieu
                        : 'Ngày chiếu: ' + data.ngaychieu}
                </Text>
                <Text style={[styles.text, { fontSize }]} numberOfLines={2}>
                    Thể loại: {data.theloai}
                </Text>
                {listCase === 'movieUpcoming' ? null : (
                    <LinearGradient
                        colors={[Colors.DARK_RED, '#FF6666']}
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
                                {listCase === 'moviePresent'
                                    ? 'Đặt vé'
                                    : listCase === 'TicketViewed' ||
                                      listCase === 'TicketUnView'
                                    ? 'Chi tiết vé'
                                    : null}
                            </Text>
                        </Pressable>
                    </LinearGradient>
                )}
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
