import {
    FlatList,
    Image,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { Header, MovieList, NoShowtimeMessage } from '../components';
import ticketAPI from '../api/ticketAPI';
import { useDispatch, useSelector } from 'react-redux';
import { idUsersSelector } from '../redux/selectors';
import { clearUsers } from '../redux/slice/usersSlice';

const TopTabsTicketHistory = [
    { id: 1, category: 'Phim sắp xem' },
    { id: 2, category: 'Phim đã xem' },
];

const TicketScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const [clickTab, setClickTab] = useState(0);
    const [data, setData] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [movie, setMovie] = useState([]);

    const idUser = useSelector(idUsersSelector);
    const dispatch = useDispatch();
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
                const response = await ticketAPI.getAll(idUser);
                // console.log(response.data);
                response.status ? setData(response.data) : setData([]);
            } catch (error) {
                console.log('Error fetching tickets', error);
            }
        };
        fetchTickets();

        const updateCurrentDate = () => {
            var current = new Date();
            var day = current.getDate();
            var month = current.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            var year = current.getFullYear();
            setCurrentDate(`${year}-${month}-${day}`);
        };

        updateCurrentDate();

        // Cập nhật lịch sau mỗi 5 phút
        const interval = setInterval(() => {
            updateCurrentDate();
            console.log('1');
        }, 300000); // 5 phút

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const filterTypeTicket =
            data !== undefined
                ? data.filter((item) =>
                      clickTab === 0
                          ? item.ngaykhoichieu >= currentDate
                          : item.ngaykhoichieu < currentDate,
                  )
                : [];
        setMovie(filterTypeTicket);
        console.log({ movie });
    }, [clickTab]);

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
                        renderItem={({ item }) => (
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
