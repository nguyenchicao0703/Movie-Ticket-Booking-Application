import { Text, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Fonts } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';

const SelectShowtime = ({ data, nameMovie, nameCinema }) => {
    const navigation = useNavigation();
    const [dataShowtimes, setDataShowtimes] = useState([]);
    const dataUser = useSelector(usersSelector);
    const [userProfile, setUserProfile] = useState(dataUser.users.data);
    const [isLogin, setIsLogin] = useState(
        userProfile ? userProfile.islogin : '',
    );

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
            navigation.navigate('Login');
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
