import {
    Pressable,
    Text,
    View,
    useWindowDimensions,
    StatusBar,
} from 'react-native';
import React, { useEffect, useState, Suspense } from 'react';
import { Header, Loading, NoShowtimeMessage } from '../components';
import { Colors, Fonts } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { moviesRemainingSelector } from '../redux/selectors';
import { fetchMovies } from '../redux/slice/moviesSlice';

const MovieList = React.lazy(() => import('../components/list/MovieList'));

const TopTabsCategory = [
    { id: 1, category: 'Đang chiếu' },
    { id: 2, category: 'Sắp chiếu' },
];

const moviesPresent = 1;
const movieFuture = 2;

let listCase;

const MovieScreen = ({ navigation }) => {
    const { width, fontScale } = useWindowDimensions();
    const [movie, setMovie] = useState([]);
    const [clickTab, setClickTab] = useState(0);

    const dispatch = useDispatch();
    const movies = useSelector(moviesRemainingSelector);

    useEffect(() => {
        const filterTypePremiere = movies.movies.filter((item) =>
            clickTab === 0
                ? item.loaikc === moviesPresent
                : item.loaikc === movieFuture,
        );
        setMovie(filterTypePremiere);
        clickTab === 0
            ? (listCase = 'moviePresent')
            : (listCase = 'movieUpcoming');
    }, [clickTab, movies]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);

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
            {movie.length === 0 ? (
                <NoShowtimeMessage
                    title={'Chưa có dữ liệu phim'}
                    listCase={'NoMovie'}
                />
            ) : (
                <Suspense fallback={<Loading />}>
                    <MovieList data={movie} listCase={listCase} />
                </Suspense>
            )}
        </View>
    );
};

export default MovieScreen;
