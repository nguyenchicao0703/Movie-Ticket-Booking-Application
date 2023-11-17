import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Colors, Fonts, SeatImage } from '../constants';
import { Header, InformationBottom } from '../components';
import { useDispatch } from 'react-redux';
import {
    getCinema,
    getMovie,
    getPrice,
    getSeats,
    getDate,
    getShowtimes,
} from '../redux/slice/informationShowtimesSlice';

const TypeSeat = ({ backgroundColor, text }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 50,
            }}
        >
            <View
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor,
                }}
            />
            <Text
                style={{
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 14,
                    fontFamily: Fonts.Medium,
                    marginLeft: 10,
                }}
            >
                {text}
            </Text>
        </View>
    );
};

const alphabetSeats = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
];

const SeatScreen = ({ navigation, route }) => {
    const { nameMovie, nameCinema, stringSeats, priceShowitmes } = route.params;
    // console.log({ stringSeats });
    // console.log({ priceShowitmes });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState(stringSeats);
    const [totalPrice, setTotalPrice] = useState(0);
    const [storageSeats, setStorageSeats] = useState('');

    const STATUS_AVAILABLE = 1;
    const STATUS_BOOKED = 2;
    const STATUS_RESERVED = 3;

    let seatNumber = 1;
    let alphabetIndexNumber = 0;
    let seatIndexNumber = 0;

    // Cập nhật lại chuỗi khi dữ liệu chuỗi ghế (stringSeats) thay đổi
    useEffect(() => {
        setSeats(stringSeats);

        // Đặt lại giá trị mặc định giá trị khi điều hướng sang màn hình khác
        return () => {
            setSelectedSeats([]);
            setSeats('');
            setTotalPrice(0);
            setStorageSeats('');
        };
    }, [stringSeats]);

    const handleSeatPress = useCallback((seatId, seatIndexNumber) => {
        // console.log({ seatIndexNumber });
        const isSelected = selectedSeats.includes(seatId);
        let updatedSeats;
        if (isSelected) {
            updatedSeats = selectedSeats.filter((seat) => seat !== seatId); // Hủy bỏ chọn ghế
            setTotalPrice(totalPrice - priceShowitmes);
        } else {
            updatedSeats = [...selectedSeats, seatId]; // Chọn ghế
            setTotalPrice(totalPrice + priceShowitmes);
        }
        setSelectedSeats(updatedSeats);
        setStorageSeats(updatedSeats.join(', '));
        isSelected
            ? selectedSeats.filter((seat) => seat !== seatId)
            : [...selectedSeats, seatId];
        const seatsArr = seats.split(''); // ['A', 'A', 'U', 'R', ...]
        seatsArr[seatIndexNumber] = isSelected ? 'A' : 'R'; // Tìm vị trí của phần tử trong mảng sau đó thay thế ký tự
        setSeats(seatsArr.join('')); // Chuyển lại thành chuỗi để render components
    });

    const dispatch = useDispatch();

    const navigationSeatToCombo = () => {
        dispatch(getMovie(nameMovie));
        dispatch(getCinema(nameCinema));
        dispatch(getPrice(totalPrice));
        dispatch(getSeats(storageSeats));
        dispatch(getShowtimes('00:00:00'));
        dispatch(getDate('20/11/2023'));
        navigation.navigate('Combo');
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    // seats.split(/(\/)/) (array)
    // ["AAAAAAA_AAAAAAA", "/", "AAAAAAA_AAAAAAA", "/", "AAAAAAA_AAUUAAA", "/", "AAAAAAA_AAAAAAA", "/", "AAAAARR_AAAAAAA", "/", "AAAAAAA_AAUUUAA", "/", "AAAAAAA_AAAAUUU", "/", "AAUUAAU_AAAAAAA", "/", "UUAAAAA_AAUUURR", "/", "AAAAAUU_AAAAAAA", "/", "AAAARRU_UUUAAAA", "/", "AAUUAAA_AAAAAAA", "/", "AAAAAAA_AUUUUAA", "/", "________________"]

    // row (string)
    // "AAAAAAA_AUUUUAA"

    // row.split('') (array)
    // ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]

    // seat (string)
    // A, U, R, _, /

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={nameCinema}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ScrollView>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={SeatImage[0].image}
                        style={{ alignSelf: 'center', marginTop: 25 }}
                    />
                    <Text
                        style={{
                            color: Colors.DEFAULT_WHITE,
                            fontSize: 25,
                            fontFamily: Fonts.Bold,
                            alignSelf: 'center',
                            marginBottom: 20,
                        }}
                    >
                        Màn hình
                    </Text>
                    <View style={styles.layoutSeat}>
                        {seats.split(/(\/)/).map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.split('').map((seat, seatIndex) => {
                                    let status = null;
                                    if (seat === 'U') {
                                        status = STATUS_BOOKED;
                                    } else if (seat === 'A') {
                                        status = STATUS_AVAILABLE;
                                    } else if (seat === 'R') {
                                        status = STATUS_RESERVED;
                                    } else if (seat === '_') {
                                        seatIndexNumber++;
                                        return (
                                            <View
                                                key={seatIndex}
                                                style={styles.seat}
                                            />
                                        );
                                    } else if (seat === '/') {
                                        alphabetIndexNumber++;
                                        seatNumber = 1;
                                        seatIndexNumber++;
                                        return;
                                    }

                                    seatNumber < 10
                                        ? (seatNumber = '0' + seatNumber)
                                        : seatNumber;

                                    const seatId =
                                        alphabetSeats[alphabetIndexNumber] +
                                        seatNumber;

                                    seatNumber++;
                                    const seatNumberId = seatIndexNumber;
                                    seatIndexNumber++;

                                    return (
                                        <TouchableOpacity
                                            key={seatIndex}
                                            style={[
                                                styles.seat,
                                                status === STATUS_BOOKED &&
                                                    styles.bookedSeat,
                                                status === STATUS_AVAILABLE &&
                                                    styles.availableSeat,
                                                status === STATUS_RESERVED &&
                                                    styles.reservedSeat,
                                            ]}
                                            onPress={() =>
                                                handleSeatPress(
                                                    seatId,
                                                    seatNumberId,
                                                )
                                            }
                                            disabled={status === STATUS_BOOKED}
                                        >
                                            <Text style={styles.seatText}>
                                                {seatId}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                    <View style={{ marginBottom: 200, flexDirection: 'row' }}>
                        <TypeSeat
                            text={'Ghế tiêu chuẩn'}
                            backgroundColor={Colors.DARK_SEAT}
                        />
                        <TypeSeat
                            text={'Ghế đã đặt'}
                            backgroundColor={Colors.MEDIUM_INDIGO}
                        />
                        <TypeSeat
                            text={'Ghế đang chọn'}
                            backgroundColor={Colors.DEFAULT_RED}
                        />
                    </View>
                </ScrollView>
            </ScrollView>
            <InformationBottom
                nameMovie={nameMovie}
                seat={storageSeats}
                totalPayment={totalPrice}
                onPress={navigationSeatToCombo}
            />
        </View>
    );
};

export default SeatScreen;

const styles = StyleSheet.create({
    layoutSeat: {
        padding: 30,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    seat: {
        width: 40,
        height: 40,
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    },
    seatText: {
        fontSize: 14,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
    },
    availableSeat: {
        backgroundColor: Colors.DARK_SEAT,
    },
    bookedSeat: {
        backgroundColor: Colors.MEDIUM_INDIGO,
    },
    reservedSeat: {
        backgroundColor: Colors.DEFAULT_RED,
    },
    displayInfomation: {
        fontSize: 14,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
        maxWidth: 240,
    },
});
