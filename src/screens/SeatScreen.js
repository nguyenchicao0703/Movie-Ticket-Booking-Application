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
import { useSelector, useDispatch } from 'react-redux';
import { datesSelector, usersSelector } from '../redux/selectors';
import socket from '../utils/socket';
import {
    setDateShowtime,
    setMovieName,
    setShowtime,
    setCinemaName,
    setTotalPayment,
    setSeatsIndex,
    setMovieImage,
} from '../redux/slice/bookingSlice';
import { setIdShowtimes, setListSeat } from '../redux/setChairsSlice';
import { setSelectedSeats } from '../redux/slice/selectedSeatsSlice';

const TypeSeat = React.memo(({ backgroundColor, text }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 50,
                marginBottom: 20,
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
});

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

const STATUS_AVAILABLE = 1;
const STATUS_BOOKED = 2;
const STATUS_RESERVED = 3;
const STATUS_ASSIGNED = 4;

const SeatScreen = ({ navigation, route }) => {
    const {
        nameMovie,
        imageMovie,
        nameCinema,
        priceShowitmes,
        idShowtimes,
        headerShowtimes,
    } = route.params;
    // const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [storageSeats, setStorageSeats] = useState('');
    const [indexSeat, setIndexSeat] = useState([]);
    const [checkStatusTimerSeats, setCheckStatusTimerSeats] = useState(true);
    const [timer, setTimer] = useState(null);
    const [countSeat, setCountSeat] = useState(0);
    const [timeoutIds, setTimeoutIds] = useState([]);

    // console.log({ idShowtimes });

    const dispatch = useDispatch();
    const selectedSeats = useSelector(
        (state) => state.selectedSeats.selectedSeats,
    );
    const idUsersSelector = useSelector(usersSelector);
    const headerDate = useSelector(datesSelector); // Chỉ dùng để gửi đến header

    let seatNumber = 1;
    let alphabetIndexNumber = 0;
    let seatIndexNumber = 0;

    // const seat = useSelector((state) => state.seatString.seatString);
    // console.log('seat', seat);

    useEffect(() => {
        socket.connect();
        function onConnect() {
            socket.emit('suat', JSON.stringify({ id: idShowtimes }));
            console.log('connect');
        }
        function onDisconnect(value) {
            console.log('disconnect');
            console.log('discount', value);
            let _seatIndexNumber;
            for (let i = 0; i < indexSeat.length; i++) {
                _seatIndexNumber = indexSeat[i].index;
                socket.emit(
                    'chonghe',
                    JSON.stringify({
                        id: idShowtimes,
                        index: _seatIndexNumber,
                        status: 'A',
                    }),
                );
                // setSelectedSeats([]);
                dispatch(setSelectedSeats([]));
                setIndexSeat([]);
                setTotalPrice(0);
                setStorageSeats('');
            }
        }
        function onSuat(value) {
            setSeats(value.results[0]['chuoighe']);
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('suat', onSuat);
        socket.on('connect_error', (err) => {
            console.log(err instanceof Error);
            console.log(err.message);
        });
        return () => {
            socket.disconnect();
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('suat', onDisconnect);
        };
    }, [idShowtimes]);

    const returnDefault = useCallback(() => {
        // setSelectedSeats([]);
        dispatch(setSelectedSeats([]));
        setStorageSeats('');
        setTotalPrice(0);
        setIndexSeat([]);
        setTimeoutIds([]);
    }, []);

    const handleSeatPress = (seatId, seatIndexNumber) => {
        // console.log({ seatIndexNumber });
        // console.log({ seatId });
        const isSelected = selectedSeats.includes(seatId);
        let updatedSeats;
        setCheckStatusTimerSeats(false);
        if (isSelected) {
            socket.emit(
                'chonghe',
                JSON.stringify({
                    id: idShowtimes,
                    index: seatIndexNumber,
                    status: 'A',
                }),
            );
            updatedSeats = selectedSeats.filter((seat) => seat !== seatId); // Hủy bỏ chọn ghế
            const copyWithoutFirstElement = indexSeat.filter(
                (value) => value.index !== seatIndexNumber,
            );
            setIndexSeat([...copyWithoutFirstElement]);
            setTotalPrice(totalPrice - priceShowitmes);
            setCountSeat(countSeat - 1);
            // timeoutIds.filter((timeoutId) => timeoutId !== timer); // Hủy bỏ chọn ghế
            // clearTimeout(timer);
        } else {
            socket.emit(
                'chonghe',
                JSON.stringify({
                    id: idShowtimes,
                    index: seatIndexNumber,
                    status: 'S',
                }),
            );
            updatedSeats = [...selectedSeats, seatId]; // Chọn ghế
            setIndexSeat([
                ...indexSeat,
                { index: seatIndexNumber, soghe: seatId },
            ]);
            setTotalPrice(totalPrice + priceShowitmes);
            setCountSeat(countSeat + 1);
            if (checkStatusTimerSeats) {
                const timerId = setTimeout(() => {
                    returnDefault();
                    socket.emit(
                        'chonghe',
                        JSON.stringify({
                            id: idShowtimes,
                            index: seatIndexNumber,
                            status: 'A',
                        }),
                    );
                    setCheckStatusTimerSeats(true);
                    console.log('log');
                }, 5000); // 1 phuts

                setTimeoutIds([...timeoutIds, timerId]);
                setTimer(timerId);
            }
        }
        setCheckStatusTimerSeats(true);

        // setSelectedSeats(updatedSeats);
        dispatch(setSelectedSeats(updatedSeats));
        setStorageSeats(updatedSeats.join(', '));
    };

    // console.log({ storageSeats });
    // console.log({ selectedSeats });
    // console.log({ seats });
    // console.log({ timeoutIds });
    // console.log({ timer });

    // console.log({ indexSeat });

    // const navigationSeatToCombo = async () => {
    //     try {
    //         // console.log(
    //         //     'id_user',
    //         //     idUsersSelector.users.length !== 0 &&
    //         //         idUsersSelector.users.data.id_user,
    //         // );
    //         console.log('id_suat', idShowtimes);
    //         console.log('listghe', [...indexSeat]);
    //         socket.emit(
    //             'datghe',
    //             JSON.stringify({
    //                 id_user:
    //                     idUsersSelector.users.length !== 0 &&
    //                     idUsersSelector.users.data.id_user,
    //                 id_suat: idShowtimes,
    //                 listghe: [...indexSeat],
    //             }),
    //         );
    //         returnDefault();
    //         clearTimeout(timer);
    //     } catch (error) {
    //         console.log('Error fetch seats', error);
    //     }
    // };

    const navigationSeatToCombo = () => {
        dispatch(setCinemaName(nameCinema));
        dispatch(setMovieImage(imageMovie));
        dispatch(setMovieName(nameMovie));
        dispatch(setDateShowtime(headerDate.dates));
        dispatch(setShowtime(headerShowtimes));
        dispatch(setTotalPayment(totalPrice));
        dispatch(setSeatsIndex(storageSeats));
        dispatch(setIdShowtimes(idShowtimes));
        dispatch(setListSeat([...indexSeat]));
        // returnDefault();
        // setSelectedSeats([]);
        // setStorageSeats('');
        // setTotalPrice(0);
        setIndexSeat([]);
        timeoutIds.forEach((value) => clearTimeout(value));
        navigation.navigate('Combo', {
            idShowtimes,
            quantityTicket: countSeat,
        });
    };

    // console.log({ selectedSeats });

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const formatCurrency = (amount) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(amount);
    };
    const formattedTotal = formatCurrency(totalPrice);

    const handleButtonBack = () => {
        // Return trạng thái của "ghế đang chọn" -> "ghế trống"
        // Return state default
        let _seatIndexNumber;
        for (let i = 0; i < indexSeat.length; i++) {
            _seatIndexNumber = indexSeat[i].index;
            console.log({ _seatIndexNumber });
            socket.emit(
                'chonghe',
                JSON.stringify({
                    id: idShowtimes,
                    index: _seatIndexNumber,
                    status: 'A',
                }),
            );
            returnDefault();
        }
        // setCheckStatusTimerSeats(true);
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
                activatedTitleSeats
                dateShowtime={headerDate.dates}
                showtimes={headerShowtimes}
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
                                    // console.log({ seat });
                                    let status = null;
                                    seatNumber < 10 && seat !== '_'
                                        ? (seatNumber = '0' + seatNumber)
                                        : seatNumber;
                                    const seatId =
                                        alphabetSeats[alphabetIndexNumber] +
                                        seatNumber;

                                    if (selectedSeats.includes(seatId)) {
                                        status = STATUS_RESERVED;
                                    } else if (seat === 'U') {
                                        status = STATUS_BOOKED;
                                    } else if (seat === 'S') {
                                        status = STATUS_ASSIGNED;
                                    } else if (seat === 'A') {
                                        status = STATUS_AVAILABLE;
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

                                    seatNumber++;
                                    const seatNumberId = seatIndexNumber;
                                    seatIndexNumber++;

                                    return (
                                        <TouchableOpacity
                                            key={seatId}
                                            style={[
                                                styles.seat,
                                                status === STATUS_BOOKED &&
                                                    styles.bookedSeat,
                                                status === STATUS_ASSIGNED &&
                                                    styles.assignedSeat,
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
                                            disabled={
                                                status === STATUS_BOOKED
                                                // ||
                                                // status === STATUS_ASSIGNED
                                            }
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
                        <View style={{ flexDirection: 'column' }}>
                            <TypeSeat
                                text={'Ghế tiêu chuẩn'}
                                backgroundColor={Colors.DARK_SEAT}
                            />
                            <TypeSeat
                                text={'Ghế đã đặt'}
                                backgroundColor={Colors.MEDIUM_INDIGO}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <TypeSeat
                                text={'Ghế đang chọn'}
                                backgroundColor={Colors.DEFAULT_RED}
                            />
                            <TypeSeat
                                text={'Ghế người khác đang chọn'}
                                backgroundColor={Colors.DEFAULT_ORANGE}
                            />
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <InformationBottom
                nameMovie={nameMovie}
                seat={storageSeats}
                totalPayment={formattedTotal}
                onPress={storageSeats !== '' ? navigationSeatToCombo : null}
                // onPress={navigationSeatToCombo}
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
    assignedSeat: {
        backgroundColor: Colors.DEFAULT_ORANGE,
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
