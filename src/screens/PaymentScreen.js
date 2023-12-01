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
import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Colors, Fonts, HomeImage, PaymentImage } from '../constants';
import {
    Header,
    PaymentCombo,
    PaymentContentBar,
    PaymentTitleBar,
    AuthAccountButton,
} from '../components';
import { useSelector } from 'react-redux';
import { bookingSelector } from '../redux/selectors';
import PaymentBar from '../components/PaymentBar';

const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const PaymentScreen = ({ navigation, route }) => {
    const { width, fontScale } = useWindowDimensions();
    const textSizeInfoMovie = fontScale * 14;
    const { discountId, discountDate, discountPrice } = route.params;
    console.log({ discountId }, { discountDate }, { discountPrice });
    // const navigation = useNavigation();

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack();
    };

    const handleButtonNavigation = (router) => {
        navigation.navigate(router);
    };
    const [discoutPayment, setDiscountPayment] = React.useState(0);
    const [money, setMoney] = React.useState('0');
    const [token, setToken] = React.useState('');
    const bookingData = useSelector(bookingSelector);

    const itemBK = [bookingData];
    // console.log(token);
    // console.log(itemBK);

    const token_trans_id = token;
    const [dataApi, setDataApi] = React.useState('');
    const data = dataApi;
    const [returncode, setReturnCode] = React.useState('');
    const [dataID, setDataID] = React.useState('');
    const [dataMac, setDataMac] = React.useState();
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
        console.log(order);

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
                console.log(resJson);
                setDataApi(resJson);
                setToken(resJson.zp_trans_token);
                setReturnCode(resJson.return_code);
            })
            .catch((error) => {
                console.log('error ', error);
            });
        // console.log('123123123:' + dataID);
    }
    const payOrder = (token) => {
        // createOrder(1000);
        // token từ BE trả về nha
        const payZP = NativeModules.ZaloPayBridge;
        console.log(token);
        console.log(returncode);
        console.log(token_trans_id);
        console.log(data);
        console.log('=====================');
        // console.log('order:' + reqmac);

        payZP.payOrder(token_trans_id);

        // callBack();
        setTimeout(() => {
            callBack();
        }, 3000);
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
            // mac: '537e156527b4933404486e9283569bfb3d6752c89d3ea7e4d6b8a5c551ea0a32',
            mac: CryptoJS.HmacSHA256(hmacInput, config.key1).toString(),
        };
        console.log(dataCB);
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
            console.log(resJson);
            if (resJson.return_code == 1) {
                // Alert.alert('Thanh toán thành công');
                navigation.navigate('Bill');
            } else {
                // Alert.alert('Thanh toán không thành công');
            }
        } catch (e) {
            console.error('Error creating order:', e);
        }
    };
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
                        source={HomeImage[1].image}
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
                            {bookingData.date}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            {bookingData.showtime}
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            {bookingData.cinemaName}
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
                <PaymentCombo
                    name={'BABY SHARK SINGLE COMBO '}
                    amount={'195.000'}
                    number={'1'}
                />
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
                <Pressable onPress={() => handleButtonNavigation('Discount')}>
                    <PaymentContentBar
                        content={'Phiếu giảm giá'}
                        number={'>'}
                        numberBoolean
                    />
                </Pressable>
                {/* Change */}
                <PaymentTitleBar title={'Tổng kết'} />
                <PaymentContentBar
                    content={'Giá vé bao gồm F&B'}
                    number={bookingData.totalPayment}
                    lineBoolean
                />
                <PaymentContentBar
                    content={'Số tiền được giảm giá'}
                    number={discoutPayment}
                    lineBoolean
                />
                <PaymentContentBar
                    content={'Tổng tiền'}
                    number={bookingData.totalPayment - discoutPayment}
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
                            createOrder(bookingData.totalPayment);
                            payOrder();
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
