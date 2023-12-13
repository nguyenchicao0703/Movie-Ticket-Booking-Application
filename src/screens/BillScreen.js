import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { LineBill } from '../constants';
import { Colors, Fonts } from '../constants/index';
import { Header } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import {
    bookingSelector,
    discountSelector,
    usersSelector,
} from '../redux/selectors';
import QRCode from 'react-native-qrcode-svg';
import billAPI from '../api/billAPI';
import {
    setMovieName,
    setCinemaName,
    setDateShowtime,
    setShowtime,
    setTotalPayment,
    setSeatsIndex,
    setCombo,
} from '../redux/slice/bookingSlice';

const BillScreen = ({ navigation, route }) => {
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };
    const { zpID, postData, idTicket } = route.params;
    const dispatch = useDispatch();
    const [response, setResponse] = useState([]);
    const discountData = useSelector(discountSelector);
    const discountPrice = discountData.discountPayment;
    const userData = useSelector(usersSelector);
    const idUser = Number(userData.users.data.id_user);
    console.log(idUser);
    console.log(idTicket);
    const idVe = Number(idTicket);
    const handleButtonBack = () => {
        navigation.navigate('Home');
    };
    React.useEffect(() => {
        try {
            const getBill = async () => {
                const responseBill = await billAPI.watchBill(idUser, idVe);

                const resBill = responseBill.data;
                console.log(responseBill);
                if (responseBill.status == true) {
                    dispatch(setMovieName(resBill.ten_phim)),
                        dispatch(setCinemaName(resBill.ten_rap)),
                        dispatch(setDateShowtime(resBill.ngaychieu)),
                        dispatch(setShowtime(resBill.giochieu)),
                        dispatch(setSeatsIndex(resBill.ghe)),
                        dispatch(setTotalPayment(resBill.tongtien)),
                        dispatch(setCombo(resBill.combo));
                }
            };
            getBill();
        } catch (error) {}
    }, []);

    console.log(response.ghe);
    const dataBooking = useSelector(bookingSelector);
    const formatCurrency = (amount) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(amount);
    };

    // Sử dụng hàm formatCurrency với số tiền cần format
    const formattedPaymentTotal = formatCurrency(dataBooking.totalPayment);
    const formattedDiscountPrice = formatCurrency(discountPrice);
    const formattedPayment = formatCurrency(
        dataBooking.totalPayment - discountPrice,
    );
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
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: Fonts.Bold,
                                textTransform: 'uppercase',
                                color: Colors.DEFAULT_WHITE,
                                fontSize: 22,
                            }}
                        >
                            Phim bố già và những anh em chí cốt
                        </Text>
                        <Pressable onPress={() => console.log('Oke')}>
                            <Text
                                style={{
                                    fontFamily: Fonts.Light,
                                    color: Colors.LIGHT_GRAY,
                                    textDecorationLine: 'underline',
                                    fontStyle: 'italic',
                                    marginLeft: 5,
                                }}
                            >
                                {' '}
                                xem chi tiết phim{' '}
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.bodyAbove1}>
                        <Text style={styles.txt}>07 tháng 10, 2023</Text>
                        <Text style={styles.txt}>15:00 ~ 19:00</Text>
                    </View>
                    <View style={styles.bodyAbove2}>
                        <Text style={styles.title}>Rạp</Text>
                        <Text style={styles.txt}>MTB Gò Vấp</Text>
                    </View>
                    <View style={styles.bodyAbove3}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <View style={styles.bodyAbove3Left}>
                                <Text style={styles.title}>Ghế</Text>
                                <Text style={styles.txt}>H18, H19</Text>
                            </View>

                            <View style={styles.bodyAbove3Left}>
                                <Text style={styles.title}>Phòng chiếu</Text>
                                <Text
                                    style={[styles.txt, { textAlign: 'right' }]}
                                >
                                    Cinema A2
                                </Text>
                            </View>
                        </View>

                        {/* <View style={styles.bodyAbove3Right}>
                            <Text style={styles.title}>Phòng chiếu</Text>
                            <Text style={styles.txt}>Cinema A2</Text>
                        </View> */}
                    </View>
                    <Image style={styles.lineBill} source={LineBill[0].image} />
                    <View style={styles.bodyBelow}>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>Giá vé:</Text>
                            <Text style={styles.txt}>200.000 đ</Text>
                        </View>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>Giá combo:</Text>
                            <Text style={styles.txt}>90.000 đ</Text>
                        </View>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>Số tiền được giảm:</Text>
                            <Text style={styles.txt}>20.000 đ</Text>
                        </View>
                        <View style={styles.bodyBelow1}>
                            <Text style={styles.title}>Tổng tiền:</Text>
                            <Text style={styles.txt}>410.000 đ</Text>
                        </View>
                        <View style={styles.bodyBelow2}>
                            <Text numberOfLines={1} style={styles.txt2}>
                                (*) Vé đã đặt không được hoàn trả, xin cảm ơn!
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.qr} source={LineBill[1].image} />
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
        marginTop: 5,
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
