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
import { datesSelector } from '../redux/selectors';
import NoShowtimeMessage from '../components/NoShowtimeMessage';

const ShowtimeMovieScreen = ({ navigation, route }) => {
    const { idMovie, nameMovie } = route.params;
    console.log({ idMovie });
    const [nameCinema, setNameCinema] = useState('');
    const [data, setData] = useState([]);
    // const [dataShowtimes, setDataShowtimes] = useState([]);
    const [statusGetAPI, setSatusGetAPI] = useState(false);
    const [stringSeats, setStringSeats] = useState('');

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const date = useSelector(datesSelector);

    useEffect(() => {
        const fetchingShowtimeMovies = async () => {
            try {
                console.log('Selected dates', date);
                const response = await showtimesAPI.getAllMovies(idMovie, date);
                setData(response.data);
                setSatusGetAPI(response.status);
                console.log(statusGetAPI);
                // const allShowtimes = response.data[0].phong.flatMap((phong) =>
                //     phong.suat.map((suat) => {
                //         const showtimes = suat.giochieu.split(' ')[1]; // Chỉ lấy phần giờ từ giá trị 'giochieu'
                //         return showtimes;
                //     }),
                // );
                // setDataShowtimes(allShowtimes);
                // const allCinemas = response.data.map((value) => {
                //     setNameCinema(value.ten_rap);
                //     value.phong.map((phong) => {
                //         phong.suat.map((suat) => {
                //             setStringSeats(suat.chuoighe);
                //         })
                //     })
                // });
                // console.log({ allCinemas });
                setNameCinema(response.data[0].ten_rap);
                console.log('Response data showtime movies', data);
                // console.log('Name Cinema', response.data[0].ten_rap);
                // console.log(
                //     'Price showtimes',
                //     response.data[0].phong[0].suat[0].giaxuatchieu,
                // );
                // console.log('Showtimes', allShowtimes);
            } catch (error) {
                console.log('Error fetching showtime movies', error);
            }
        };

        fetchingShowtimeMovies();
    }, [date]);

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
                <MovieTitle title={nameCinema} />
                {statusGetAPI ? (
                    data.map((_data) => (
                        <View key={_data.id_rap}>
                            <View>
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
                                        {nameCinema}
                                    </Text>
                                </View>
                                <SelectShowtime data={_data.phong} />
                            </View>
                        </View>
                    ))
                ) : (
                    <NoShowtimeMessage />
                )}
            </ScrollView>
        </View>
    );
};

export default ShowtimeMovieScreen;
