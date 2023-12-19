import {
    Text,
    Image,
    View,
    ImageBackground,
    useWindowDimensions,
    Pressable,
    ToastAndroid,
    StyleSheet,
    Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, DrawerImage, Fonts } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { resetUsers } from '../redux/slice/usersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Line = () => {
    return (
        <View
            style={{
                width: '95%',
                height: 1,
                backgroundColor: Colors.LIGHT_GRAY,
                alignSelf: 'center',
                marginTop: 1,
                opacity: 0.35,
            }}
        />
    );
};

const Item = ({ imageIndex, title, navigation, router }) => {
    const { width, height, fontScale } = useWindowDimensions();

    return (
        <Pressable
            style={{
                flexDirection: 'row',
                marginHorizontal: width * 0.072,
                alignContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
            }}
            onPress={() => navigation.navigate(router)}
        >
            <Image
                source={DrawerImage[imageIndex].image}
                style={{ width: 35, height: 35 }}
            />
            <Text
                style={{
                    marginLeft: 18,
                    fontSize: fontScale * 16,
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.Regular,
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
};

const CustomDrawerContent = ({ navigation }) => {
    const dataUser = useSelector(usersSelector);
    const { width, height, fontScale } = useWindowDimensions();
    const [userInfo, setUserInfo] = useState(null);
    const [nameUser, setNameUser] = useState('Nguyễn Văn A');
    const [isLogin, setIsLogin] = useState(
        dataUser.users.data ? dataUser.users.data.islogin : '',
    );
    const [modalVisible, setModalVisible] = useState(false);

    const [avatar, setAvatar] = useState(
        'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
    );
    const dispatch = useDispatch();
    useEffect(() => {
        setAvatar(
            dataUser.users.data
                ? dataUser.users.data.avatar
                : 'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
        );
        setNameUser(
            dataUser.users.data ? dataUser.users.data.name : 'Nguyen Van A',
        );
        setIsLogin(dataUser.users.data ? dataUser.users.data.islogin : '');
    }, [dataUser.users.data]);
    const handleSignOut = async () => {
        try {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
                await GoogleSignin.revokeAccess(); // Revoke Google access token
                await GoogleSignin.signOut(); // Sign out from Google
            }

            // Clear any relevant authentication state in your app
            setUserInfo(null);
            dispatch(resetUsers());
            console.log('Sign out');
            await AsyncStorage.removeItem('user');
            navigation.navigate('Home');
            ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT);
            console.log(isLogin);
        } catch (error) {
            console.log('Sign out error:', error.message);
        }
    };
    const handleCheckIslogin = () => {
        if (isLogin) {
            console.log('thành công');
            navigation.navigate('Ticket');
        } else {
            console.log('Thất bại, bạn cần đăg nhập để tiếp tục');
            setModalVisible(true);
        }
    };
    const handleLogin = () => {
        if (isLogin) {
            ToastAndroid.show('Bạn đã đăng nhập rồi !');
        } else {
            console.log(isLogin);
            setTimeout(() => {
                navigation.navigate('Login');
            });

            setModalVisible(false);
        }
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    return (
        <ImageBackground
            style={{ flex: 1, backgroundColor: Colors.DARK_DRAWER }}
            source={DrawerImage[0].image}
        >
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { height: height * 0.18 }]}>
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
                                    Đăng nhập
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Image
                source={{ uri: avatar }}
                style={{
                    alignSelf: 'center',
                    marginTop: height * 0.032,
                    width: width * 0.28,
                    height: width * 0.28,
                    borderRadius: 100,
                }}
            />
            <Text
                style={{
                    fontSize: fontScale * 20,
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.Bold,
                    textAlign: 'center',
                    marginRight: 7.33,
                    marginTop: 10,
                    marginBottom: 32,
                }}
            >
                {nameUser}
            </Text>
            <Line />
            <Item
                imageIndex={2}
                title={'Trang chủ'}
                navigation={navigation}
                router={'Home'}
            />
            <Line />
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: height * 0.1,
                }}
                onPress={() => handleCheckIslogin()}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: -80,
                    }}
                >
                    <Image
                        style={{ marginLeft: -14 }}
                        source={DrawerImage[4].image}
                    />
                    <Text
                        style={{
                            fontSize: fontScale * 16,
                            color: Colors.DEFAULT_WHITE,
                            fontFamily: Fonts.Regular,
                            marginLeft: 16,
                        }}
                    >
                        Vé của tôi
                    </Text>
                </View>
            </Pressable>
            <Line />
            <Item
                imageIndex={3}
                title={'Đặt vé theo phim'}
                navigation={navigation}
                router={'Movie'}
            />
            <Line />
            <Item
                imageIndex={1}
                title={'Đặt vé theo rạp'}
                navigation={navigation}
                router={'Cinema'}
            />
            <Line />
            {isLogin ? (
                <Pressable
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: height * 0.1,
                    }}
                    onPress={() => handleSignOut()}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: -80,
                        }}
                    >
                        <Image style={{}} source={DrawerImage[7].image} />
                        <Text
                            style={{
                                fontSize: fontScale * 16,
                                color: Colors.DEFAULT_WHITE,
                                fontFamily: Fonts.Regular,
                                marginLeft: 8,
                            }}
                        >
                            Đăng xuất
                        </Text>
                    </View>
                </Pressable>
            ) : null}

            <Line />
        </ImageBackground>
    );
};

export default CustomDrawerContent;

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
