import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
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

const ShowtimeCinemaScreen = ({ navigation, route }) => {
    const { idCinema, nameCinema } = route.params;
    const [data, setData] = useState([]);
    // const [dataShowtimes, setDataShowtimes] = useState([]);
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
                console.log('Selected dates', date);
                const response = await showtimesAPI.getAllCinemas(
                    idCinema,
                    date,
                );
                setData(response.data);
                setSatusGetAPI(response.status);
                // const allShowtimes = response.data[0].phong.flatMap((phong) =>
                //     phong.suat.map((suat) => {
                //         const showtimes = suat.giochieu.split(' ')[1]; // Chỉ lấy phần giờ từ giá trị 'giochieu'
                //         return showtimes;
                //     }),
                // );
                // setDataShowtimes(allShowtimes);
                console.log('Response showtime cinemas', data);
                // console.log('Showtimes', allShowtimes);
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
                            <SelectShowtime data={_data.phong} />
                        </View>
                    ))
                ) : (
                    <NoShowtimeMessage />
                )}
            </ScrollView>
        </View>
    );
};

export default ShowtimeCinemaScreen;
