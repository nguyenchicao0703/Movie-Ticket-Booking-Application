import {
    StyleSheet,
    Text,
    ScrollView,
    NativeModules,
    NativeEventEmitter,
    useWindowDimensions,
    Pressable,
    View,
    Image,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { Colors, Fonts, HomeImage, PaymentImage } from '../constants';
import {
    Header,
    PaymentCombo,
    PaymentContentBar,
    PaymentTitleBar,
    AuthAccountButton,
    Loading,
} from '../components';
import { useSelector, useDispatch } from 'react-redux';
import {
    bookingSelector,
    discountSelector,
    chairsSelector,
    usersSelector,
} from '../redux/selectors';
import PaymentBar from '../components/PaymentBar';
import PaymentDiscount from '../components/PaymentDiscount';
import socket from '../utils/socket';
import BillAPI from '../api/apiCreateBill';
import { setSelectedSeats } from '../redux/slice/selectedSeatsSlice';

const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const PaymentScreen = ({ navigation, route }) => {
    const { width, fontScale } = useWindowDimensions();
    const textSizeInfoMovie = fontScale * 14;

    const [socket1, setSocket1] = useState(null);

    const { response } = route.params;

    const resCombo = response.data;
    // console.log(response.data.combo);
    const dispatch = useDispatch();
    const idUsersSelector = useSelector(usersSelector);
    const dataChairs = useSelector(chairsSelector);
    let indexGhe = null;
    console.log('chaird', dataChairs.listSeat);
    if (dataChairs && dataChairs.listSeat && dataChairs.listSeat.length > 0) {
        indexGhe = dataChairs.listSeat;
    }
    const idShowtimes = dataChairs.idShowtime;
    console.log('idShowtimes', Number(idShowtimes));
    let idCombo;
    let quality;
    try {
        for (let i in response.data.combo) {
            idCombo = resCombo.combo[i].id_combo;
            quality = resCombo.combo[i].soluong;
        }
    } catch (error) {}

    console.log('=======================');
    // console.log(idCombo, quality);
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack();
    };

    const handleButtonNavigation = (router) => {
        navigation.navigate(router);
    };

    useEffect(() => {
        const socketConnect = socket.connect();
        setSocket1(socketConnect);

        return () => {
            socketConnect.disconnect();
        };
    }, []);

    const discountData = useSelector(discountSelector);
    // console.log(discountData);
    const discountCode = discountData.discountCode;
    const discountPrice = discountData.discountPayment;
    const discountId = discountData.discountId;
    const [money, setMoney] = React.useState('0');
    const [token, setToken] = React.useState('');
    const bookingData = useSelector(bookingSelector);
    const itemBK = [
        bookingData.movieName,
        bookingData.movieImage,
        bookingData.cinemaName,
        bookingData.dateShowtime,
        bookingData.showtime,
        bookingData.seatsIndex,
        bookingData.totalPayment,
        bookingData.combo,
        discountPrice,
    ];
    const postData = {
        id_user: parseInt(idUsersSelector.users.data.id_user),
        id_suat: parseInt(response.data.id_suatchieu),
        id_km: Number(discountId),
        tongtien: response.data.tongbill,
        soghe: bookingData.seatsIndex,
        listcombo: [{ id: parseInt(idCombo), soluong: parseInt(quality) }],
    };
    console.log(postData);
    // console.log(token);
    // console.log(itemBK);

    const token_trans_id = token;
    const [dataApi, setDataApi] = React.useState('');
    const data = dataApi;
    const [returncode, setReturnCode] = React.useState('');
    const [dataID, setDataID] = React.useState('');
    const [dataMac, setDataMac] = React.useState();
    const [zpCode, setZpCode] = React.useState([]);

    useEffect(() => {
        const subscription = payZaloBridgeEmitter.addListener(
            'EventPayZalo',
            (data) => {
                if (data.returnCode == 1) {
                    // handle action
                    Alert.alert('Pay sucsess' + data.returnCode);
                } else if (data.returnCode == -1) {
                    ZaloPayBridge.installApp();

                    Alert.alert('Pay errror! ' + data.returnCode);
                }
                console.log(data.returnCode);
            },
        );
        return () => subscription?.remove();
    }, []);
    // useEffect(() => {
    //     socket.connect();
    //     function onConnect() {
    //         console.log('connect');
    //     }
    //     function onDisconnect(value) {
    //         console.log('disconnect');
    //         console.log('discount', value);
    //     }
    //     socket.on('connect', onConnect);
    //     socket.on('disconnect', onDisconnect);
    //     socket.on('connect_error', (err) => {
    //         console.log(err instanceof Error);
    //         console.log(err.message);
    //     });
    //     return () => {
    //         socket.disconnect();
    //         socket.off('connect', onConnect);
    //         socket.off('disconnect', onDisconnect);
    //     };
    // }, []);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await BillAPI.postBill(postData);
    //             console.log(response);
    //         } catch (error) {
    //             console.log('Error response Combo', error);
    //         }
    //     };
    //     return fetchData();
    // }, []);
    console.log('id user', idUsersSelector.users.data.id_user);

    const lockSeat = async () => {
        try {
            // console.log('listghe', [...indexSeat]);
            socket.emit(
                'datghe',
                JSON.stringify({
                    id_user:
                        idUsersSelector.users.length !== 0 &&
                        idUsersSelector.users.data.id_user,
                    id_suat: Number(idShowtimes),
                    listghe: dataChairs.listGhe,
                }),
            );
        } catch (error) {}
    };
    function getCurrentDateYYMMDD() {
        var todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
    }

    function getCurrentDateYYMMDD() {
        var todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
    }
    async function createOrder(money) {
        let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();

        let appid = 2554;
        let amount = parseInt(money);
        let appuser = 'ZaloPayDemo';
        let apptime = new Date().getTime();
        let embeddata = '{}';
        let item = JSON.stringify(itemBK);
        let description = 'Merchant description for order #' + apptransid;
        let hmacInput =
            appid +
            '|' +
            apptransid +
            '|' +
            appuser +
            '|' +
            amount +
            '|' +
            apptime +
            '|' +
            embeddata +
            '|' +
            item;
        let mac = CryptoJS.HmacSHA256(
            hmacInput,
            'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
        ).toString();
        setDataID(apptransid);
        setDataMac(mac);
        // console.log('====================================');
        // console.log('hmacInput: ' + hmacInput);
        // console.log('mac: ' + mac);
        // console.log('====================================');
        let order = {
            app_id: appid,
            app_user: appuser,
            app_time: apptime,
            amount: amount,
            app_trans_id: apptransid,
            embed_data: embeddata,
            item: item,
            description: description,
            mac: mac,
        };
        // console.log(order);

        let formBody = [];
        for (let i in order) {
            var encodedKey = encodeURIComponent(i);
            var encodedValue = encodeURIComponent(order[i]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        await fetch('https://sb-openapi.zalopay.vn/v2/create', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody,
        })
            .then((response) => response.json())
            .then((resJson) => {
                // console.log(resJson);
                setDataApi(resJson);
                setToken(resJson.zp_trans_token);
                setReturnCode(resJson.return_code);
            })
            .catch((error) => {
                console.log('error ', error);
            });
        // console.log('123123123:' + dataID);
    }
    // useEffect(() => {
    //     try {
    //         socket.emit(
    //             'datghe',
    //             JSON.stringify({
    //                 id_user:
    //                     idUsersSelector.users.length !== 0 &&
    //                     idUsersSelector.users.data.id_user,
    //                 id_suat: Number(idShowtimes),
    //                 listghe: dataChairs.listGhe,
    //             }),
    //         );
    //     } catch (error) {}
    // }, []);

    const payOrder = (token) => {
        createOrder(parseInt(bookingData.totalPayment - discountPrice));
        // token từ BE trả về nha
        const payZP = NativeModules.ZaloPayBridge;
        // console.log(token);
        // console.log(returncode);
        // console.log(token_trans_id);
        // console.log(data);
        // console.log('=====================');
        // console.log('order:' + reqmac);

        payZP.payOrder(token_trans_id);

        // callBack();
        setTimeout(() => {
            callBack();
        }, 5000);
    };

    const callBack = async () => {
        const config = {
            app_id: 2554,
            key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
            key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
            endpoint: 'https://sb-openapi.zalopay.vn/v2/query',
        };
        const hmacInput = config.app_id + '|' + dataID + '|' + config.key1;

        const dataCB = {
            app_id: config.app_id,
            app_trans_id: dataID,
            mac: CryptoJS.HmacSHA256(hmacInput, config.key1).toString(),
        };
        // console.log(dataCB);
        try {
            let formBody = [];
            for (let i in dataCB) {
                var encodedKey = encodeURIComponent(i);
                var encodedValue = encodeURIComponent(dataCB[i]);
                formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');

            const response = await fetch(config.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formBody,
            });
            const resJson = await response.json(); // Phải sử dụng await ở đây để lấy dữ liệu JSON từ response
            // console.log(resJson);
            if (resJson.return_code == 1) {
                // Alert.alert('Thanh toán thành công');
                try {
                    const response = await BillAPI.postBill(
                        postData.id_user,
                        postData.id_suat,
                        postData.id_km,
                        postData.tongtien,
                        postData.soghe,
                        postData.listcombo,
                    );
                    console.log(response);
                    socket.emit(
                        'datghe',
                        JSON.stringify({
                            id_user:
                                idUsersSelector.users.length !== 0 &&
                                idUsersSelector.users.data.id_user,
                            id_suat: Number(idShowtimes),
                            listghe: dataChairs.listSeat,
                        }),
                    );
                    socket1.emit('suat', JSON.stringify({ id: idShowtimes }));
                    dispatch(setSelectedSeats([]));
                } catch (error) {
                    console.log('Error response Combo', error);
                }

                <Loading />;
                navigation.navigate('Bill', { discountPrice });
            } else {
                // Alert.alert('Thanh toán không thành công');
            }
        } catch (e) {
            console.error('Error creating order:', e);
        }
    };
    const formatCurrency = (amount) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return formatter.format(amount);
    };

    // Sử dụng hàm formatCurrency với số tiền cần format
    const formattedPaymentTotal = formatCurrency(bookingData.totalPayment);
    const formattedDiscountPrice = formatCurrency(discountPrice);
    const formattedPayment = formatCurrency(
        bookingData.totalPayment - discountPrice,
    );
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.DARK_BG,
            }}
        >
            <Header
                titleHeader={'Thanh toán'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}
                >
                    <Image
                        style={{
                            width: '25%',
                            height: width * 0.35,
                            borderRadius: 5,
                        }}
                        source={{ uri: response.data.hinhanh }}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            height: '100%',
                            width: '75%',
                            marginLeft: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fontScale * 16,
                                fontFamily: Fonts.Bold,
                                color: Colors.DEFAULT_WHITE,
                                textTransform: 'uppercase',
                            }}
                        >
                            {bookingData.movieName}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            Ngày chiếu: {bookingData.date}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            Giờ chiếu: {bookingData.showtime}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            Rạp: {bookingData.cinemaName}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            Ghế: {bookingData.seatsIndex}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                {
                                    fontSize: textSizeInfoMovie,
                                    color: Colors.DARK_RED,
                                },
                            ]}
                        >
                            Tổng thanh toán: {bookingData.totalPayment} đ
                        </Text>
                    </View>
                </View>
                <PaymentTitleBar title={'THÔNG TIN VÉ '} />
                <PaymentBar content={'Số lượng'} number={1} lineBoolean />
                <PaymentContentBar
                    content={'Tổng'}
                    number={bookingData.totalPayment}
                />
                <PaymentTitleBar title={'Thông tin bắp nước'} />
                {/* <PaymentCombo
                    name={response.data.combo.tensanpham}
                    amount={response.data.combo.giatien}
                    number={response.data.combo.soluong}
                    image={response.data.combo.hinhanh}
                /> */}
                {/* <PaymentCombo
                    name={'BABY SHARK SINGLE COMBO '}
                    amount={'195.000'}
                    number={'1'}
                /> */}
                {/* <PaymentContentBar content={'Tổng'} number={'>'} /> */}
                <PaymentContentBar
                    content={'Combo'}
                    number={'>'}
                    numberBoolean
                />
                <PaymentTitleBar title={'Phương thức giảm giá'} />
                {discountPrice != 0 ? (
                    <PaymentDiscount
                        discount={discountCode}
                        number={discountPrice}
                    />
                ) : (
                    <Pressable
                        onPress={() => handleButtonNavigation('Discount')}
                    >
                        <PaymentContentBar
                            content={'Phiếu giảm giá'}
                            number={'>'}
                            numberBoolean
                        />
                    </Pressable>
                )}

                {/* <PaymentDiscount discount={discountId} number={discountPrice} /> */}
                {/* Change */}
                <PaymentTitleBar title={'Tổng kết'} />
                <PaymentContentBar
                    content={'Giá vé bao gồm F&B'}
                    number={formattedPaymentTotal}
                    lineBoolean
                />
                <PaymentContentBar
                    content={'Số tiền được giảm giá'}
                    number={formattedDiscountPrice}
                    lineBoolean
                />
                <PaymentContentBar
                    content={'Tổng tiền'}
                    number={formattedPayment}
                />
                <PaymentTitleBar title={'Thanh toán'} />
                {/* ZaloPay */}
                <Pressable
                    style={{
                        width: '100%',
                        height: width * 0.15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        borderBottomWidth: 0.8,
                        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={PaymentImage[0].image}
                            style={{ width: width * 0.1, height: width * 0.1 }}
                        />
                        <Text
                            style={{
                                color: Colors.LIGHT_GRAY,
                                fontSize: fontScale * 18,
                                fontFamily: Fonts.Regular,
                                marginLeft: 10,
                            }}
                        >
                            ZaloPay
                        </Text>
                    </View>
                    <Image source={PaymentImage[1].image} />
                </Pressable>
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <AuthAccountButton
                        onPress={() => /**/ {
                            payOrder();
                            // funcTest();
                            // callBack();
                        }}
                        text={'Thanh toán'}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    comboContent: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Regular,
    },
    textContent: {
        fontFamily: Fonts.Regular,
        fontSize: 13,
    },
});
