import { Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
import {
    CalendarList,
    Header,
    SelectShowtime,
    MovieTitle,
} from '../components';
import { ScrollView } from 'react-native-virtualized-view';

const Movie = [
    { id: 1, movie: 'spider-man no way home' },
    { id: 2, movie: 'spider-man no way home' },
    { id: 3, movie: 'spider-man no way home' },
];

const ShowtimeCinemaScreen = ({ navigation, route }) => {
    const { cinemaId, cinemaTitle } = route.params;

    console.log({ cinemaTitle });

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={cinemaTitle}
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
                {Movie.map((value, index) => (
                    <View key={index}>
                        <MovieTitle title={'SPIDER-MAN No Way Home'} />
                        <SelectShowtime marginTop={15} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ShowtimeCinemaScreen;
