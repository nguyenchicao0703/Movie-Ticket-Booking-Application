import {
    Pressable,
    Text,
    View,
    useWindowDimensions,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { Header, MovieList } from '../components';
import {
    Colors,
    Fonts,
    SelectMoviesFuture,
    SelectMoviesPresent,
    SelectMoviesSpecial,
} from '../constants';

const TopTabsCategory = [
    { id: 1, category: 'Đang chiếu' },
    { id: 2, category: 'Sắp chiếu' },
    { id: 3, category: 'Đặc biệt' },
];

const MovieScreen = ({ navigation }) => {
    const { width, fontScale } = useWindowDimensions();
    const [clickTab, setClickTab] = useState(0);

    const handleClickTab = (index) => {
        setClickTab(index);
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <Header
                titleHeader={'Chọn phim'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <View style={{ flexDirection: 'row' }}>
                {TopTabsCategory.map((value, index) => (
                    <Pressable
                        key={index}
                        style={{ marginLeft: width * 0.05, marginTop: 25 }}
                        onPress={() => handleClickTab(index)}
                    >
                        <Text
                            style={{
                                color: Colors.DEFAULT_WHITE,
                                fontSize: fontScale * 16,
                                fontFamily:
                                    clickTab === index
                                        ? Fonts.SemiBold
                                        : Fonts.Light,
                            }}
                        >
                            {value.category}
                        </Text>
                    </Pressable>
                ))}
            </View>
            {clickTab === 0 ? (
                <MovieList data={SelectMoviesPresent} />
            ) : clickTab === 1 ? (
                <MovieList data={SelectMoviesFuture} />
            ) : (
                <MovieList data={SelectMoviesSpecial} />
            )}
        </View>
    );
};

export default MovieScreen;