import {
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomTabImage, DrawerImage, HeaderImage } from '../constants';
import { Colors, Fonts } from '../constants/index';
import LinearGradient from 'react-native-linear-gradient';
import { HomeList } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slice/moviesSlice';
import { moviesListSelector, usersSelector } from '../redux/selectors';

const bottomTabs = [
    { id: 1, image: 1, title: 'Phim', tab: 'Movie' },
    { id: 2, image: 0, title: 'Rạp', tab: 'Cinema' },
    { id: 3, image: 4, title: '', tab: 'Home' },
    { id: 4, image: 2, title: 'Vé', tab: 'Ticket' },
    { id: 5, image: 3, title: 'Quản lí', tab: 'Profile' },
];

const HomeScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const textTitle = fontScale * 22;

    const [avatar, setAvatar] = useState(
        'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
    );

    const dispatch = useDispatch();
    const movies = useSelector(moviesListSelector);
    const avatarSelector = useSelector(usersSelector);
    // console.log({ movies });

    const stackScreen = (router) => {
        navigation.navigate(router);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const dataMoviePresent = movies.filter((item) => item.loaikc === 1);
    const dataMovieSpecial = movies.filter((item) => item.loaikc === 2);

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);

    useEffect(() => {
        setAvatar(avatarSelector.users.data.avatar);
    }, [avatarSelector]);

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: Colors.DARK_BG,
            }}
        >
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <ScrollView
                style={{
                    marginBottom: height * 0.1 + 13,
                    paddingBottom: 100,
                }}
            >
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable
                        style={{ marginLeft: 15 }}
                        onPress={() => stackScreen('Profile')}
                    >
                        <Image
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 100,
                            }}
                            source={{ uri: avatar }}
                        />
                    </Pressable>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Pressable
                            style={[
                                styles.headerRight,
                                { width: 32, height: 22 },
                            ]}
                            onPress={() => stackScreen('Ticket')}
                        >
                            <Image source={HeaderImage[2].image} />
                        </Pressable>
                        <Pressable
                            style={[
                                styles.headerRight,
                                { marginLeft: 20, marginRight: 15 },
                            ]}
                            onPress={() => handleButtonMenu()}
                        >
                            <Image source={HeaderImage[1].image} />
                        </Pressable>
                    </View>
                </View>
                <Text
                    style={[
                        styles.title,
                        { marginTop: 21, fontSize: textTitle },
                    ]}
                >
                    Phim đang chiếu
                </Text>
                <HomeList data={dataMoviePresent} />
                <Text
                    style={[
                        styles.title,
                        { marginTop: 23, fontSize: textTitle },
                    ]}
                >
                    Phim sắp chiếu
                </Text>
                <HomeList data={dataMovieSpecial} />
            </ScrollView>
            {/* bottom tab */}
            <LinearGradient
                colors={[Colors.DARK_RED, '#FF6666']}
                locations={[0.35, 1]}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: width * 0.2 - 5,
                    // height: height * 0.1,
                    bottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderRadius: 10,
                    alignSelf: 'center',
                }}
            >
                {bottomTabs.map((value, index) => (
                    <Pressable
                        key={index}
                        style={{
                            alignSelf: 'center',
                            marginTop: 5,
                        }}
                        onPress={() => stackScreen(value.tab)}
                    >
                        <Image
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                                marginBottom: 7,
                            }}
                            source={BottomTabImage[value.image].image}
                        />
                        {value.id === 3 ? undefined : (
                            <Text
                                style={{
                                    color: Colors.DEFAULT_WHITE,
                                    fontSize: fontScale * 14,
                                    fontFamily: Fonts.Regular,
                                    textAlign: 'center',
                                }}
                            >
                                {value.title}
                            </Text>
                        )}
                    </Pressable>
                ))}
            </LinearGradient>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    headerRight: {
        alignSelf: 'center',
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
    },
    list: {
        marginTop: 8,
    },
});
