import {
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    NativeModules,
    NativeEventEmitter,
    useWindowDimensions,
    Pressable,
    TextInput,
    View,
    Image,
    Button,
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

const { PayZaloBridge } = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
const PaymentScreen = (navigation) => {
    const { width, fontScale } = useWindowDimensions();
    const textSizeInfoMovie = fontScale * 14;

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonNavigation = (router) => {
        navigation.navigate(router);
    };
    const [money, setMoney] = React.useState('10000');
    const [token, setToken] = React.useState('');

    // console.log(token);
    const token_trans_id = token;
    const [dataApi, setDataApi] = React.useState('');
    const data = dataApi;
    const [returncode, setReturnCode] = React.useState('');

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
        let item = '[]';
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
        );
        console.log('====================================');
        console.log('hmacInput: ' + hmacInput);
        console.log('mac: ' + mac);
        console.log('====================================');
        var order = {
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
    }
    const payOrder = (token) => {
        createOrder(10000);
        // token từ BE trả về nha
        const payZP = NativeModules.ZaloPayBridge;
        // console.log(token);
        console.log(returncode);
        console.log(token_trans_id);
        console.log(data);

        payZP.payOrder(token_trans_id);
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
                            SPIDER-MAN NO WAY HOME
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            07 tháng 10, 2023
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            15:00 ~ 17:11
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            MTB Gò Vấp
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                { fontSize: textSizeInfoMovie },
                            ]}
                        >
                            Ghế: H18, H19
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
                            Tổng thanh toán: 590.000 đ
                        </Text>
                    </View>
                </View>
                <PaymentTitleBar title={'THÔNG TIN VÉ '} />
                <PaymentContentBar
                    content={'Số lượng'}
                    number={'3'}
                    lineBoolean
                />
                <PaymentContentBar content={'Tổng'} number={'220.000 đ'} />
                <PaymentTitleBar title={'Thông tin bắp nước'} />
                <PaymentCombo
                    name={'BABY SHARK SINGLE COMBO '}
                    amount={'195.000'}
                    number={'1'}
                />
                <PaymentCombo
                    name={'BABY SHARK SINGLE COMBO '}
                    amount={'195.000'}
                    number={'1'}
                />
                <PaymentContentBar content={'Tổng'} number={'390.000'} />
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
                    number={'610.000'}
                    lineBoolean
                />
                <PaymentContentBar
                    content={'Số tiền được giảm giá'}
                    number={'20.000'}
                    lineBoolean
                />
                <PaymentContentBar content={'Tổng tiền'} number={'590.000'} />
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
                        onPress={() => /*handleButtonNavigation('Bill')*/ {
                            createOrder(10000), payOrder();
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
