import { Text, View, Image, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { Colors, Fonts, SelectShowTimeImage } from '../constants';
import {
    Header,
    MovieTitle,
    NoShowtimeMessage,
    CalendarCard,
    Loading,
} from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import showtimesAPI from '../api/showtimesAPI';
import { useSelector, useDispatch } from 'react-redux';
import { datesRemainingSelector } from '../redux/selectors';
import { format, addDays } from 'date-fns';
import { getDate, resetStateCalender } from '../redux/slice/calendarsSlice';

const SelectShowtime = React.lazy(() => import('../components/SelectShowtime'));

const ShowtimeMovieScreen = ({ navigation, route }) => {
    const { idMovie, nameMovie } = route.params;
    const [data, setData] = useState([]);
    const [statusGetAPI, setSatusGetAPI] = useState(false);
    const [weekSchedule, setWeekSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    let dateSelector = useSelector(datesRemainingSelector);

    // console.log({ idMovie });

    const handleButtonBack = useCallback(() => {
        navigation.goBack(null);
    }, [navigation]);

    const handleButtonMenu = useCallback(() => {
        navigation.openDrawer();
    }, [navigation]);

    const updateWeekSchedule = useCallback(() => {
        const currentDate = new Date(); // Lấy thời gian thực
        const weekDays = [];

        // 1 tuần
        for (let i = 0; i < 7; i++) {
            const day = addDays(currentDate, i);
            weekDays.push(day);
        }

        setWeekSchedule(weekDays);
    }, []);

    useEffect(() => {
        updateWeekSchedule();

        // Cập nhật lịch sau mỗi 1 phút
        const interval = setInterval(() => {
            updateWeekSchedule();
        }, 120000); // 2 phút

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const fetchingShowtimeMovies = async () => {
            try {
                setLoading(true);
                const response = await showtimesAPI.getAllMovies(
                    idMovie,
                    dateSelector.dates,
                );
                // console.log('data showtimes movies', response);
                response.status ? setData(response.data) : setData([]);
                setLoading(false);
                setSatusGetAPI(response.status);
            } catch (error) {
                console.log('Error fetching showtime movies', error);
            }
        };

        fetchingShowtimeMovies();
    }, [dateSelector.dates]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Chọn suất chiếu'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ScrollView>
                <Text
                    style={{
                        fontSize: 18,
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: Fonts.SemiBold,
                        marginLeft: 15,
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                >
                    Chọn ngày
                </Text>
                <FlatList
                    data={weekSchedule}
                    extraData={weekSchedule}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <CalendarCard
                            date={format(item, 'dd')} // Ngày
                            day={format(item, 'eeee')} // Thứ
                            isFirst={index === 0}
                            index={index}
                            selectedDate={dateSelector.isSelect}
                            data={format(item, 'yyyy-MM-dd')}
                        />
                    )}
                />
                <MovieTitle title={nameMovie} />
                {loading ? (
                    <Loading />
                ) : statusGetAPI ? (
                    data.map((_data, index) => (
                        <View key={_data.id_rap}>
                            <Suspense fallback={<Loading />}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginLeft: 15,
                                        marginTop: 12,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        source={SelectShowTimeImage[0].image}
                                    />
                                    <Text
                                        style={{
                                            color: Colors.DEFAULT_WHITE,
                                            fontSize: 18,
                                            fontFamily: Fonts.Regular,
                                            marginLeft: 10,
                                            marginTop: 3,
                                        }}
                                    >
                                        {_data.ten_rap}
                                    </Text>
                                </View>
                                <SelectShowtime
                                    data={_data.phong}
                                    nameMovie={nameMovie}
                                    nameCinema={_data.ten_rap}
                                />
                            </Suspense>
                        </View>
                    ))
                ) : (
                    <NoShowtimeMessage
                        title={'Ôi không, Hôm nay chưa có suất chiếu'}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default ShowtimeMovieScreen;
