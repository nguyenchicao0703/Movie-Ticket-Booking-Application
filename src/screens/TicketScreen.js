import {
    FlatList,
    Image,
    Pressable,
    Text,
    ToastAndroid,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { Header, MovieList, NoShowtimeMessage } from '../components';
import ticketAPI from '../api/ticketAPI';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';
import socket from '../utils/socket';

const TopTabsTicketHistory = [
    { id: 1, category: 'Phim sắp xem' },
    { id: 2, category: 'Phim đã xem' },
];

const TicketScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const [clickTab, setClickTab] = useState(0);
    const [data, setData] = useState([]);
    const [movie, setMovie] = useState([]);
    const [index, setIndex] = useState('1');

    const idUser = useSelector(usersSelector);

    const handleClickTopTab = (index) => {
        setClickTab(index);
    };

    const handleButtonBack = () => {
        navigation.goBack();
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await ticketAPI.getAll(
                    idUser.users.data.id_user,
                );
                // console.log('response ticket', response.data);
                console.log('fetch');
                response.status ? setData(response.data) : setData([]);
                console.log('thay đổi');
            } catch (error) {
                console.log('Error fetching tickets', error);
            }
        };
        fetchTickets();

        socket.connect();
        function onConnect() {
            console.log('connect');
        }
        function onDisconnect() {
            console.log('disconnect');
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', (err) => {
            console.log(err instanceof Error);
            console.log(err.message);
        });
        return () => {
            socket.disconnect();
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [index]);

    useEffect(() => {
        // console.log('data', data);
        let filterTypeTicket =
            data !== undefined
                ? data.filter((item) =>
                      clickTab === 0 ? item.loaikc === 1 : item.loaikc === 2,
                  )
                : [];
        setMovie(filterTypeTicket);
        // console.log({ movie });
        console.log('movie đã đc render');
    }, [clickTab, data]);

    const handleCancelTicket = async (idTicket, index) => {
        await socket.emit(
            'huyve',
            JSON.stringify({
                id_user: idUser.users.data.id_user,
                id_ve: idTicket,
            }),
        );
        setIndex(index);
        ToastAndroid.show('Hủy vé thành công', ToastAndroid.LONG);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Vé của tôi'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {TopTabsTicketHistory.map((value, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleClickTopTab(index)}
                        style={[
                            {
                                width: '50%',
                                height: width * 0.05 + height * 0.05,
                                backgroundColor:
                                    Colors.DARK_INDIGO_TICKET_HISTORY,
                                justifyContent: 'center',
                            },
                            clickTab === index
                                ? {
                                      borderBottomWidth: 1.5,
                                      borderBottomColor: Colors.DARK_RED,
                                  }
                                : null,
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: fontScale * 20,
                                color:
                                    clickTab === index
                                        ? Colors.DARK_RED
                                        : Colors.LIGHT_GRAY,
                                fontFamily: Fonts.Medium,
                                textAlign: 'center',
                            }}
                        >
                            {value.category}
                        </Text>
                    </Pressable>
                ))}
            </View>
            {clickTab === 0 ? (
                movie.length === 0 ? (
                    <NoShowtimeMessage title={'Chưa có dữ liệu vé của bạn'} />
                ) : (
                    <FlatList
                        style={{ marginHorizontal: 10 }}
                        data={movie}
                        extraData={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Pressable
                                style={{
                                    width: '100%',
                                    height: height * 0.32,
                                    marginTop: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor:
                                        Colors.OPACITY_MEDIUM_GRAY_LINE,
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={{ uri: item.hinhanh }}
                                        style={{
                                            width: width * 0.32,
                                            height: height * 0.28 + 10,
                                            borderRadius: 5,
                                            marginRight: 10,
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: width * 0.35,
                                                paddingVertical: 5,
                                                backgroundColor:
                                                    Colors.MEDIUM_GREEN,
                                                borderRadius: 5,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: Colors.DEFAULT_WHITE,
                                                    fontSize: fontScale * 16,
                                                    fontFamily: Fonts.Bold,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Mã vé: {item.id_ve}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: Colors.DEFAULT_WHITE,
                                                fontSize: fontScale * 16,
                                                fontFamily: Fonts.Bold,
                                                maxWidth: 230,
                                                marginTop: 10,
                                            }}
                                        >
                                            {item.ten_phim}
                                        </Text>
                                        <Text
                                            style={{
                                                color: Colors.DARK_RED,
                                                fontSize: fontScale * 16,
                                                fontFamily: Fonts.SemiBold,
                                                maxWidth: 230,
                                                marginTop: 10,
                                            }}
                                        >
                                            {item.giaxuatchieu} đ
                                        </Text>
                                        <Pressable
                                            style={{
                                                width: width * 0.25,
                                                height: width * 0.1,
                                                justifyContent: 'center',
                                                borderRadius: 40,
                                                marginTop: 10,
                                                backgroundColor:
                                                    item.trangthai === '0'
                                                        ? Colors.LIGHT_GRAY
                                                        : Colors.DARK_RED,
                                            }}
                                            onPress={() =>
                                                handleCancelTicket(
                                                    item.id_ve,
                                                    index,
                                                )
                                            }
                                            disabled={
                                                item.trangthai === '0'
                                                    ? true
                                                    : false
                                            }
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    color: Colors.DEFAULT_WHITE,
                                                    fontFamily: Fonts.Medium,
                                                    fontSize: fontScale * 16,
                                                }}
                                            >
                                                {item.trangthai === '0'
                                                    ? 'Đã hủy vé'
                                                    : 'Hủy vé'}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />
                )
            ) : movie.length === 0 ? (
                <NoShowtimeMessage title={'Chưa có dữ liệu vé của bạn'} />
            ) : (
                <MovieList data={movie} listCase={'TicketHistory'} />
            )}
        </View>
    );
};

export default TicketScreen;
