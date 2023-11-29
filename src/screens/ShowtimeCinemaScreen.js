import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
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

const ShowtimeCinemaScreen = ({ navigation, route }) => {
    const { idCinema, nameCinema } = route.params;
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
        const fetchingShowtimeCinemas = async () => {
            try {
                const response = await showtimesAPI.getAllCinemas(
                    idCinema,
                    date,
                );
                response.status ? setData(response.data) : setData([]);
                setSatusGetAPI(response.status);
                // console.log('Response showtime cinemas', data);
            } catch (error) {
                console.log('Error fetching showtime cinemas', error);
            }
        };
        fetchingShowtimeCinemas();
    }, [date]);

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
                <CalendarList />
                {statusGetAPI ? (
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
