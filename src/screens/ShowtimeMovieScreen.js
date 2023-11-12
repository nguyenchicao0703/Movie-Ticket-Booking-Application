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

const ShowtimeMovieScreen = ({ navigation, route }) => {
    const { idMovie, nameMovie } = route.params;
    const [cinema, setCinema] = useState('');
    const [dataShowtimes, setDataShowtimes] = useState([]);

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    useEffect(() => {
        const handleShowtimeMovies = async () => {
            const responseCinema = await showtimesAPI.getIdCinema(idMovie);
            console.log('idCinema', responseCinema);
            setCinema(responseCinema.data[0].ten_rap);
            const response = await showtimesAPI.getAll(
                idMovie,
                responseCinema.data[0].id_rap,
                2023,
            );
            setDataShowtimes(response.data);
            console.log('response data showtimes', response.data);
            return response.data;
        };

        handleShowtimeMovies();
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
                            {cinema}
                        </Text>
                    </View>
                    <SelectShowtime marginTop={3} data={dataShowtimes} />
                </View>
            </ScrollView>
        </View>
    );
};

export default ShowtimeMovieScreen;
