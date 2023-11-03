import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, SeatImage } from '../constants';
import { Header } from '../components';

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

let seats = [
    'AAAAAAA_AAAAAAA/',
    'AAAAAAA_AAAAAAA/',
    'AAAAAAA_AAUUAAA/',
    'AAAAAAA_AAAAAAA/',
    'AAAAARR_AAAAAAA/',
    'AAAAAAA_AAUUUAA/',
    'AAAAAAA_AAAAUUU/',
    'AAUUAAU_AAAAAAA/',
    'UUAAAAA_AAUUURR/',
    'AAAAAUU_AAAAAAA/',
    'AAAARRU_UUUAAAA/',
    'AAUUAAA_AAAAAAA/',
    'AAAAAAA_AUUUUAA/',
    '________________',
];

const STATUS_AVAILABLE = 1;
const STATUS_BOOKED = 2;
const STATUS_RESERVED = 3;

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

const seatSize = 40;
const seatGaping = 6;

const SeatScreen = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    let seatNumber = 1;
    let alphabetIndexNumber = 0;

    const handleSeatPress = (seatId, status) => {
        console.log({ seatId });
        if (status === STATUS_AVAILABLE) {
            if (selectedSeats.includes(seatId)) {
                setSelectedSeats(
                    selectedSeats.filter((seat) => seat !== seatId),
                );
            } else {
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header titleHeader={'MTP Gò Vấp'} />
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
                        {seats.map((row, rowIndex) => (
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
                                        return (
                                            <View
                                                key={seatIndex}
                                                style={styles.seat}
                                            />
                                        );
                                    } else if (seat === '/') {
                                        alphabetIndexNumber++;
                                        seatNumber = 1;
                                        return;
                                    }

                                    const seatId =
                                        alphabetSeats[alphabetIndexNumber] +
                                        seatNumber;
                                    seatNumber++;

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
                                                handleSeatPress(seatId, status)
                                            }
                                            disabled={
                                                status !== STATUS_AVAILABLE
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
            <View
                style={{
                    width: '100%',
                    height: 80,
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: Colors.DEFAULT_WHITE,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: Colors.DEFAULT_BLACK,
                        fontSize: 16,
                        fontFamily: Fonts.Bold,
                        marginLeft: 15,
                        maxWidth: 240,
                    }}
                    numberOfLines={1}
                >
                    SPIDER-MAN NO WAY HOME
                </Text>
                <Text
                    style={[
                        styles.displayInfomation,
                        { color: Colors.DEFAULT_BLACK },
                    ]}
                    numberOfLines={1}
                >
                    Ghế E09, E10
                </Text>
                <Text
                    style={[
                        styles.displayInfomation,
                        { color: Colors.DEFAULT_RED },
                    ]}
                    numberOfLines={1}
                >
                    Tạm tính: 220.000 đ
                </Text>
                <Pressable
                    style={{
                        width: 120,
                        height: 45,
                        backgroundColor: Colors.DARK_RED,
                        borderRadius: 40,
                        position: 'absolute',
                        right: 10,
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: Colors.DEFAULT_WHITE,
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: Fonts.Medium,
                        }}
                    >
                        Tiếp tục
                    </Text>
                </Pressable>
            </View>
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
        width: seatSize,
        height: seatSize,
        margin: seatGaping,
        justifyContent: 'center',
        alignItems: 'center',
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