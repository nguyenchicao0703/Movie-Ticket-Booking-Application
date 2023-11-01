import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, SeatImage } from '../constants';
import { Header } from '../components';

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

const seatSize = 35;
const seatGaping = 7;

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
                            fontSize: 20,
                            fontFamily: Fonts.Bold,
                            alignSelf: 'center',
                            marginBottom: 30,
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
                </ScrollView>
            </ScrollView>
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
        fontSize: 12,
        color: Colors.DEFAULT_BLACK,
    },
    availableSeat: {
        backgroundColor: Colors.LIGHT_GRAY,
    },
    bookedSeat: {
        backgroundColor: Colors.MEDIUM_INDIGO,
    },
    reservedSeat: {
        backgroundColor: Colors.DEFAULT_RED,
    },
});
