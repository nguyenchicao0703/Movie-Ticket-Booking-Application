import { Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, SelectShowTimeImage } from '../constants';
import {
    CalendarList,
    Header,
    SelectShowtime,
    MovieTitle,
} from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import showtimesAPI from '../api/showtimesAPI';
import { useSelector } from 'react-redux';

const ShowtimeMovieScreen = ({ navigation, route }) => {
    const { idMovie, nameMovie } = route.params;
    // console.log({ idMovie });
    const [nameCinema, setNameCinema] = useState('');
    const [dataShowtimes, setDataShowtimes] = useState([]);

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const date = useSelector((state) => state.calendar);
    console.log('ahahi', date);

    useEffect(() => {
        const fetchingShowtimeMovies = async () => {
            try {
                const response = await showtimesAPI.getAll(idMovie, 2023);
                const allShowtimes = response.data[0].phong.flatMap((phong) =>
                    phong.suat.map((suat) => {
                        const showtimes = suat.giochieu.split(' ')[1]; // Chỉ lấy phần giờ từ giá trị 'giochieu'
                        return showtimes;
                    }),
                );
                setDataShowtimes(allShowtimes);
                setNameCinema(response.data[0].ten_rap);
                console.log('response data showtimes', allShowtimes);
            } catch (error) {
                console.log('Error fetching showtime movies', error);
            }
        };

        fetchingShowtimeMovies();
    }, []);

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
                <CalendarList />
                <MovieTitle title={nameMovie} />
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 15,
                            marginTop: 12,
                            alignItems: 'center',
                        }}
                    >
                        <Image source={SelectShowTimeImage[0].image} />
                        <Text
                            style={{
                                color: Colors.DEFAULT_WHITE,
                                fontSize: 18,
                                fontFamily: Fonts.Regular,
                                marginLeft: 10,
                                marginTop: 3,
                            }}
                        >
                            {nameCinema}
                        </Text>
                    </View>
                    <SelectShowtime data={dataShowtimes} />
                </View>
            </ScrollView>
        </View>
    );
};

export default ShowtimeMovieScreen;
