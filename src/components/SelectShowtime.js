import {
    Text,
    Pressable,
    FlatList,
    StyleSheet,
    Modal,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Fonts } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';

const SelectShowtime = ({ data, nameMovie, nameCinema, imageMovie }) => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const [dataShowtimes, setDataShowtimes] = useState([]);
    const dataUser = useSelector(usersSelector);
    const [userProfile, setUserProfile] = useState(dataUser.users.data);
    const [isLogin, setIsLogin] = useState(
        userProfile ? userProfile.islogin : '',
    );
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setUserProfile(dataUser.users.data);
        setIsLogin(dataUser.users.data ? dataUser.users.data.islogin : '');
    }, [dataUser.users.data]);

    const navigationShowtimeMovieToSeat = (item, index) => {
        // console.log({ item }, { index });
        const getSeatAndPriceData = data.flatMap((phong) =>
            phong.suat.map((suat) => {
                const seats = suat.chuoighe; // Lấy giá trị chuỗi ghế
                const price = suat.giaxuatchieu; // Lấy giá trị giá xuất chiếu
                return { seats, price };
            }),
        );

        let stringSeats = getSeatAndPriceData[index].seats;
        let priceShowitmes = getSeatAndPriceData[index].price;

        // console.log(isLogin);
        if (isLogin) {
            navigation.navigate('Seat', {
                nameMovie,
                imageMovie,
                nameCinema,
                stringSeats,
                priceShowitmes: +priceShowitmes, // Biến chuỗi thành số
                idShowtimes: data.flatMap((phong) =>
                    phong.suat.map((suat) => suat.id_suatchieu),
                )[index],
                headerShowtimes: item, // Chỉ dùng gửi đến header seat
            });
        } else {
            console.log('Thất bại, bạn cần đăg nhập để tiếp tục');
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 5000);
        }
    };

    useEffect(() => {
        // console.log('Data response select showtimes', data);
        // Lấy giờ chiếu
        const allShowtimes = data.flatMap((phong) =>
            phong.suat.map((suat) => {
                const showtimes = suat.giochieu;
                return showtimes;
            }),
        );
        setDataShowtimes(allShowtimes);
        // console.log('Showtimes', allShowtimes);
    }, []);
    const handleLogin = () => {
        if (isLogin) {
            ToastAndroid.show('Bạn đã đăng nhập rồi !');
        } else {
            navigation.navigate('Login');
            console.log(isLogin);
        }
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    return (
        <>
            <Text
                style={{
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 15,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 15,
                    marginTop: 3,
                }}
            >
                Chọn thời gian
            </Text>
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
                            Bạn cần đăng nhập trước khi đặt vé!
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
            <FlatList
                style={{
                    marginLeft: 12,
                }}
                data={dataShowtimes}
                extraData={(item) => item.id}
                numColumns={3}
                renderItem={({ item, index }) => (
                    <Pressable
                        onPress={() =>
                            navigationShowtimeMovieToSeat(item, index)
                        }
                        style={{
                            width: '30%',
                            height: 45,
                            paddingHorizontal: 8,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: Colors.LIGHT_SILVER,
                            justifyContent: 'center',
                            marginTop: 5,
                            marginBottom: 5,
                            marginRight: 12,
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
                            {item}
                        </Text>
                    </Pressable>
                )}
            />
        </>
    );
};

export default SelectShowtime;
const styles = StyleSheet.create({
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
    modalTitle: {
        textAlign: 'center',
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.SemiBold,
    },
    textStyle: {
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.SemiBold,
        fontSize: 18,
    },
});
