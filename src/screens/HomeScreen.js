import {
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Modal,
    BackHandler,
    ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomTabImage, DrawerImage, HeaderImage } from '../constants';
import { Colors, Fonts } from '../constants/index';
import LinearGradient from 'react-native-linear-gradient';
import { HomeList, Loading } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slice/moviesSlice';
import { moviesListSelector, usersSelector } from '../redux/selectors';
import Spinner from 'react-native-loading-spinner-overlay';
import { tr } from 'date-fns/locale';
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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const movies = useSelector(moviesListSelector);
    const dataUser = useSelector(usersSelector);
    const [userProfile, setUserProfile] = useState(dataUser.users.data);
    const [isLogin, setIsLogin] = useState(
        userProfile ? userProfile.islogin : '',
    );
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setUserProfile(dataUser.users.data);
        setIsLogin(dataUser.users.data ? dataUser.users.data.islogin : '');
        setAvatar(
            dataUser.users.data
                ? dataUser.users.data.avatar
                : 'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
        );
    }, [dataUser.users.data]);

    const stackScreen = (router) => {
        navigation.navigate(router);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const dataMoviePresent = movies.movies.filter((item) => item.loaikc === 1);
    const dataMovieSpecial = movies.movies.filter((item) => item.loaikc === 2);

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);

    const handleProfileScreen = () => {
        if (isLogin) {
            console.log('thành công');
            stackScreen('Profile');
        } else {
            console.log('Thất bại, bạn cần đăg nhập để tiếp tục');
            setModalVisible(true);
        }
    };
    const handleLogin = () => {
        if (isLogin) {
            ToastAndroid.show('Bạn đã đăng nhập rồi !');
        } else {
            setIsLoading(true);
            console.log(isLogin);
            setTimeout(() => {
                setIsLoading(false);
                navigation.navigate('Login');
            }, 1000);

            setModalVisible(false);
        }
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
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
                <Modal transparent={true} visible={modalVisible}>
                    <View style={styles.centeredView}>
                        <View
                            style={[
                                styles.modalView,
                                { height: height * 0.18 },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalTitle,
                                    { fontSize: height * 0.024 },
                                ]}
                            >
                                Thông báo
                            </Text>
                            <Text
                                style={[
                                    styles.modalText,
                                    { fontSize: height * 0.02 },
                                ]}
                            >
                                Bạn chưa đăng nhập !
                            </Text>
                            <View
                                style={{
                                    width: '90%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Pressable
                                    onPress={handleCancel}
                                    style={[
                                        styles.buttonClose,

                                        ,
                                        {
                                            width: width * 0.51,
                                            height: height * 0.06,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            {
                                                fontSize: height * 0.02,
                                                color: Colors.DARK_RED,
                                            },
                                        ]}
                                    >
                                        Hủy
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={handleLogin}
                                    style={[
                                        styles.button,
                                        {
                                            width: width * 0.51,
                                            height: height * 0.06,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { fontSize: height * 0.02 },
                                        ]}
                                    >
                                        Đăng nhập{' '}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Pressable
                        style={{ marginLeft: 15 }}
                        onPress={handleProfileScreen}
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
                {!movies.loading ? (
                    <Loading />
                ) : (
                    <HomeList
                        data={dataMoviePresent}
                        movieCase={'moviePresent'}
                    />
                )}
                <Text
                    style={[
                        styles.title,
                        { marginTop: 23, fontSize: textTitle },
                    ]}
                >
                    Phim sắp chiếu
                </Text>
                {!movies.loading ? (
                    <Loading />
                ) : (
                    <HomeList
                        data={dataMovieSpecial}
                        movieCase={'movieSpecial'}
                    />
                )}
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
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.DARK_RED,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    buttonClose: {
        borderRadius: 20,
        borderColor: Colors.DARK_RED,
        borderWidth: 1,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        fontFamily: Fonts.SemiBold,
    },
    modalText: {
        textAlign: 'center',
        color: Colors.DARK_GRAY,
        fontFamily: Fonts.Light,
        marginTop: 0,
    },
    textStyle: {
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.SemiBold,
        fontSize: 18,
    },
    modalTitle: {
        textAlign: 'center',
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.SemiBold,
    },
});
