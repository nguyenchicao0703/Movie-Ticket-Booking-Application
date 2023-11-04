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
import { Header, InformationBottom } from '../components';

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

const SeatScreen = ({ navigation }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState(
        'AAAAAAA_AAAAAAA/' +
            'AAAAAAA_AAAAAAA/' +
            'AAAAAAA_AAUUAAA/' +
            'AAAAAAA_AAAAAAA/' +
            'AAAAARR_AAAAAAA/' +
            'AAAAAAA_AAUUUAA/' +
            'AAAAAAA_AAAAUUU/' +
            'AAUUAAU_AAAAAAA/' +
            'UUAAAAA_AAUUURR/' +
            'AAAAAUU_AAAAAAA/' +
            'AAAARRU_UUUAAAA/' +
            'AAUUAAA_AAAAAAA/' +
            'AAAAAAA_AUUUUAA/' +
            '________________',
    );

    let seatNumber = 1;
    let alphabetIndexNumber = 0;

    const handleSeatPress = (seatId, seatIndex, status) => {
        if (status === STATUS_AVAILABLE) {
            if (selectedSeats.includes(seatId)) {
                setSelectedSeats(
                    selectedSeats.filter((seat) => seat !== seatId),
                );
            } else {
                setSelectedSeats([...selectedSeats, seatId]);
                const seatsArr = seats.split('');
                seatsArr[seatIndex] = 'R';
                const seatsStr = seatsArr.join('');
                console.log({ seatsStr });
                setSeats(seatsStr);
            }
        }
    };

    console.log({ selectedSeats });
    console.log({ seats });

    const navigationSeatToCombo = () => {
        navigation.navigate('Combo');
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'MTP Gò Vấp'}
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
                        {seats.split('/').map((row, rowIndex) => (
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
                                                handleSeatPress(
                                                    seatId,
                                                    seatIndex,
                                                    status,
                                                )
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
            <InformationBottom
                nameMovie={'SIPDER-MAN NO WAY HOME'}
                seat={'E09, E10'}
                totalPayment={'220.000'}
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
