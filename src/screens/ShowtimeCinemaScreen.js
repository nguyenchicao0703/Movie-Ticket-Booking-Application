import { Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Colors, Fonts } from '../constants';
import {
    Header,
    SelectShowtime,
    MovieTitle,
    NoShowtimeMessage,
    CalendarCard,
    Loading,
} from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import showtimesAPI from '../api/showtimesAPI';
import { useSelector } from 'react-redux';
import {
    datesRemainingSelector,
    selectedDateSelector,
} from '../redux/selectors';
import { format, addDays } from 'date-fns';

const ShowtimeCinemaScreen = ({ navigation, route }) => {
    const { idCinema, nameCinema } = route.params;
    const [data, setData] = useState([]);
    const [statusGetAPI, setSatusGetAPI] = useState(false);
    const [weekSchedule, setWeekSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    let dateSelector = useSelector(datesRemainingSelector);

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
        }, 60000); // 1 phút

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const fetchingShowtimeCinemas = async () => {
            try {
                const response = await showtimesAPI.getAllCinemas(
                    idCinema,
                    dateSelector.dates,
                );
                setIsLoading(true);
                response.status ? setData(response.data) : setData([]);
                setSatusGetAPI(response.status);
                // console.log('Response showtime cinemas', data);
            } catch (error) {
                console.log('Error fetching showtime cinemas', error);
            }
        };
        fetchingShowtimeCinemas();
    }, [dateSelector.dates]);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={nameCinema}
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
                    kextraData={weekSchedule}
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
                {!isLoading ? (
                    <Loading />
                ) : statusGetAPI ? (
                    data.map((_data) => (
                        <View key={_data.id_phim}>
                            <MovieTitle title={_data.ten_phim} />
                            <SelectShowtime
                                data={_data.phong}
                                nameCinema={nameCinema}
                                nameMovie={_data.ten_phim}
                                imageMovie={_data.hinhanh}
                            />
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

export default ShowtimeCinemaScreen;
