import { Text, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, Fonts } from '../constants';
import { useNavigation } from '@react-navigation/native';

const SelectShowtime = ({ data, nameMovie, nameCinema }) => {
    const navigation = useNavigation();
    const [dataShowtimes, setDataShowtimes] = useState([]);
    const [stringSeats, setStringSeats] = useState('');
    const [priceShowitmes, setPriceShowitmes] = useState('');

    const navigationShowtimeMovieToSeat = () => {
        navigation.navigate('Seat', {
            nameMovie,
            nameCinema,
            stringSeats,
            priceShowitmes: +priceShowitmes, // Biến chuỗi thành số
        });
    };

    useEffect(() => {
        // console.log('Data response select showtimes', data);
        // Lấy giờ chiếu
        const allShowtimes = data.flatMap((phong) =>
            phong.suat.map((suat) => {
                const showtimes = suat.giochieu.split(' ')[1]; // Chỉ lấy phần giờ từ giá trị 'giochieu'
                return showtimes;
            }),
        );
        setDataShowtimes(allShowtimes);
        // console.log('Showtimes', allShowtimes);
        data.flatMap((phong) =>
            phong.suat.map((suat) => {
                setStringSeats(suat.chuoighe); // Lấy giá trị chuỗi ghế
                setPriceShowitmes(suat.giaxuatchieu); // Lấy giá tị giá xuất chiếu
            }),
        );
        // console.log('String seat:', stringSeats);
        // console.log('Price showtimes:', priceShowitmes);
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
                renderItem={({ item }) => (
                    <Pressable
                        onPress={navigationShowtimeMovieToSeat}
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
