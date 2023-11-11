import { Text, View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, ShowtimeMovie } from '../constants';
import { CalendarList, Header, MovieTitle } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import showtimesAPI from '../api/showtimesAPI';

const Cinema = [
    { id: 1, cinema: 'MTP Gò Vấp' },
    { id: 2, cinema: 'MTP Quận 1' },
    { id: 3, cinema: 'MTP Tân Phú' },
];

const ShowtimesScreen = ({ navigation, route }) => {
    const { idMovie, nameMovie } = route.params;
    const [data, setData] = useState([]);
    console.log('id movie', idMovie);

    const navigationShowtimesToSeat = () => {
        navigation.navigate('Seat');
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    useEffect(() => {
        const handleShowtimeMovies = async () => {
            const response = await showtimesAPI.getAll(idMovie);
            console.log('response data showtimes', response.data);
            setData(response.data);
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
                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        fontSize: 15,
                        fontFamily: Fonts.SemiBold,
                        marginLeft: 10,
                        marginTop: 10,
                    }}
                >
                    Chọn thời gian
                </Text>
                <FlatList
                    style={{ alignSelf: 'center' }}
                    data={ShowtimeMovie}
                    extraData={(item) => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Pressable
                                onPress={navigationShowtimesToSeat}
                                style={{
                                    height: 45,
                                    paddingHorizontal: 8,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: Colors.LIGHT_SILVER,
                                    justifyContent: 'center',
                                    marginTop: 5,
                                    marginHorizontal: 12,
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: Colors.LIGHT_SILVER,
                                        fontSize: 14,
                                        fontFamily: Fonts.Bold,
                                        textAlign: 'center',
                                    }}
                                >
                                    03:00 - 20:00
                                </Text>
                            </Pressable>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

export default ShowtimesScreen;
