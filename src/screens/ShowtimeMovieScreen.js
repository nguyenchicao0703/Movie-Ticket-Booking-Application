import { Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, SelectShowTimeImage } from '../constants';
import {
    CalendarList,
    Header,
    SelectShowtime,
    MovieTitle,
    NoShowtimeMessage,
} from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import showtimesAPI from '../api/showtimesAPI';
import { useSelector } from 'react-redux';
import { datesSelector } from '../redux/selectors';

const ShowtimeMovieScreen = ({ navigation, route }) => {
    const { idMovie, nameMovie } = route.params;
    console.log({ idMovie });
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
                // console.log('data showtimes movies', response);
                response.status ? setData(response.data) : setData([]);
                setSatusGetAPI(response.status);
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
                <MovieTitle title={nameMovie} />
                {statusGetAPI ? (
                    data.map((_data, index) => (
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
                                        {_data.ten_rap}
                                    </Text>
                                </View>
                                <SelectShowtime
                                    data={_data.phong}
                                    nameMovie={nameMovie}
                                    nameCinema={_data.ten_rap}
                                />
                            </View>
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
