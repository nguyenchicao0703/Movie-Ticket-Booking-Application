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
    // console.log({ idMovie });
    const [nameCinema, setNameCinema] = useState('');
    const [data, setData] = useState([]);
    const [statusGetAPI, setSatusGetAPI] = useState(false);

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
                const response = await showtimesAPI.getAllMovies(idMovie, date);
                setData(response.data);
                setSatusGetAPI(response.status);
                setNameCinema(response.data[0].ten_rap);
                // console.log('Response data showtime movies', data);
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
                                <SelectShowtime
                                    data={_data.phong}
                                    nameMovie={nameMovie}
                                    nameCinema={nameCinema}
                                />
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
