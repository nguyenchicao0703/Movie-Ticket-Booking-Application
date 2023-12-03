import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { LineBill } from '../constants';
import { Colors, Fonts } from '../constants/index';
import { Header } from '../components';
import { useSelector } from 'react-redux';
import { bookingSelector } from '../redux/selectors';

const BillScreen = ({ navigation, route }) => {
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };
    const { discountPrice, zpID, postData } = route.params;
    console.log('data' + [postData]);

    const str = zpID;
    const handleButtonBack = () => {
        navigation.navigate('Home');
    };

    const dataBooking = useSelector(bookingSelector);
    // const [discountPayment, setDiscountPayment] = React.useState(0);
    return (
        <View style={styles.container}>
            <Header
                titleHeader={'Thông tin chi tiết'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <View style={styles.body}>
                <View style={styles.bodyAbove}>
                    <Text
                        style={{
                            fontFamily: Fonts.Bold,
                            textTransform: 'uppercase',
                            color: Colors.DEFAULT_WHITE,
                            fontSize: 22,
                        }}
                    >
                        {dataBooking.movieName}
                    </Text>
                    <View style={styles.bodyAbove1}>
                        <Text style={styles.txt}>
                            Ngày chiếu: {dataBooking.date}
                        </Text>
                        <Text style={styles.txt}>
                            Suất chiếu: {dataBooking.showtime}
                        </Text>
                    </View>
                    <View style={styles.bodyAbove2}>
                        <Text style={styles.title}>Rạp</Text>
                        <Text style={styles.txt}>{dataBooking.cinemaName}</Text>
                    </View>
                    <View style={styles.bodyAbove3}>
                        <View style={styles.bodyAbove3Left}>
                            <Text style={styles.title}>Ghế</Text>
                            <Text style={styles.txt}>
                                {dataBooking.seatsIndex}
                            </Text>
                        </View>
                        {/* <View style={styles.bodyAbove3Right}>
                            <Text style={styles.title}>Phòng chiếu</Text>
                            <Text style={styles.txt}>Cinema A2</Text>
                        </View> */}
                    </View>
                    <Image style={styles.lineBill} source={LineBill[0].image} />
                    <View style={styles.bodyBelow}>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>
                                Giá vé bao gồm F&B:
                            </Text>
                            <Text style={styles.txt}>
                                {dataBooking.totalPayment} đ
                            </Text>
                        </View>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>Số tiền được giảm:</Text>
                            <Text style={styles.txt}>{discountPrice} đ</Text>
                        </View>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>Tổng tiền:</Text>
                            <Text style={styles.txt}>
                                {dataBooking.totalPayment - discountPrice} đ
                            </Text>
                        </View>
                        <View style={styles.bodyBelow2}>
                            <Text style={styles.txt2}>
                                Hãy đưa mã này hoặc màn hình vé đến quầy giao
                                dịch để nhận vé của bạn
                            </Text>
                            <Text numberOfLines={1} style={styles.txt2}>
                                (*) Vé đã đặt không được hoàn trả, xin cảm ơn!
                            </Text>
                        </View>
                    </View>
                    {/* <Image style={styles.qr} source={LineBill[1].image} /> */}
                    {/* <QRCode value={str} /> */}
                </View>
            </View>
        </View>
    );
};

export default BillScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_BG,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.DARK_GRAY,
    },
    headerLeft: {
        width: 22,
        height: 22,
        marginLeft: 15,
    },
    leftText: {
        height: 22,
        marginLeft: 15,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        fontSize: 16,
    },
    headerRightView: {
        flexDirection: 'row',
    },
    headerLeftView: {
        flexDirection: 'row',
    },
    headerRight: {
        width: 32,
        height: 22,
        alignSelf: 'center',
    },
    body: {
        marginTop: 5,
    },
    bodyAbove: {
        margin: 15,
    },
    bodyAbove2: {
        marginTop: 10,
    },
    bodyAbove3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    bodyAbove3Right: { alignItems: 'flex-end' },
    txt: {
        fontFamily: Fonts.Regular,
        color: Colors.DEFAULT_WHITE,
        fontSize: 16,
    },
    title: {
        fontFamily: Fonts.SemiBold,
        color: Colors.LIGHT_GRAY,
        fontSize: 18,
    },
    lineBill: {
        marginTop: 10,
        paddingEnd: 15,
        width: 330,
    },
    bodyBelow: {
        marginTop: 10,
    },
    bodyBelow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    txt2: {
        fontFamily: Fonts.Regular,
        color: Colors.DEFAULT_WHITE,
        fontSize: 16,
        marginBottom: 10,
    },
    qr: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 10,
    },
});
