import { Text, View, Image } from 'react-native';
import React from 'react';
import { Colors, Fonts, SelectShowTimeImage } from '../constants';
import {
    CalendarList,
    Header,
    SelectShowtime,
    MovieTitle,
} from '../components';
import { ScrollView } from 'react-native-virtualized-view';

const Cinema = [
    { id: 1, cinema: 'MTP Gò Vấp' },
    { id: 2, cinema: 'MTP Quận 1' },
    { id: 3, cinema: 'MTP Tân Phú' },
];

const ShowtimeMovieScreen = ({ navigation }) => {
    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

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
                <MovieTitle title={'SPIDER-MAN No Way Home'} />
                {Cinema.map((value, index) => (
                    <View key={index}>
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
                                {value.cinema}
                            </Text>
                        </View>
                        <SelectShowtime marginTop={3} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ShowtimeMovieScreen;
