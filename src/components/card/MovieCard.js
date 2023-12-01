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
import billAPI from '../../api/billAPI';
import { useSelector } from 'react-redux';
import { usersSelector } from '../../redux/selectors';

const MovieCard = ({ data, listCase }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 14;
    const navigation = useNavigation();

    const user = useSelector(usersSelector);

    const handleButtonMovieCard = async () => {
        var idMovie = data.id_phim;
        var idTicket = data.id_ve;
        let idUser = user.users.data.id_user;
        console.log({ idMovie }, { idTicket });
        if (listCase === 'TicketViewed' || listCase === 'TicketUnView') {
            try {
                const response = await billAPI.watchBill(idUser, idTicket);
                navigation.navigate('Bill', {
                    id: idMovie,
                    idTicket,
                });
                console.log('Response data watch bill api', response.data);
            } catch (error) {
                console.log('Error response watch bill in movie card', error);
            }
        } else {
            navigation.navigate('Detail', {
                id: idMovie,
                idTicket,
            });
        }
        console.log('id phim', data.id_phim);
        console.log('id vé', data.id_ve);
    };

    const navigateMovieToShowtimeMovie = () => {
        listCase === 'MoviePresent'
            ? navigation.navigate('ShowtimeMovie', {
                  idMovie: data.id_phim,
                  nameMovie: data.ten_phim,
                  imageMovie: data.hinhanh,
              })
            : listCase === 'TicketViewed' || listCase === 'TicketUnView'
            ? navigation.navigate('Detail', {
                  idTicket: data.id_ve,
                  id: data.id_phim,
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
            // disabled={listCase === 'TicketHistory' ? true : false}
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
                    Thời lượng: {data.thoiluong} phút
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    {listCase !== 'TicketHistory'
                        ? 'Khởi chiếu: ' + data.ngaykhoichieu
                        : 'Ngày chiếu: ' + data.ngaychieu}
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
                    {listCase === 'MovieFuture' ? null : (
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
                                    : listCase === 'TicketViewed'
                                    ? 'Chi tiết phim'
                                    : 'Đặt vé'}
                            </Text>
                        </Pressable>
                    )}
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
