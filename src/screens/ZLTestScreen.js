import {
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    NativeModules,
    NativeEventEmitter,
    TextInput,
    Button,
    Alert,
} from 'react-native';
import CryptoJS from 'crypto-js';

import React, { useEffect } from 'react';
import axios from 'axios';
const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
// const subscription = payZaloBridgeEmitter.addListener(
//     'EventPayZalo',
//     (data) => {
//         if (data.returnCode == 1) {
//             alert('Pay success!');
//         } else {
//             alert('Pay errror! ' + data.returnCode);
//         }
//     },
// );

export default ZLTestScreen = (navigation) => {
    const [money, setMoney] = React.useState('10000');
    const [token, setToken] = React.useState('');

    // console.log(token);
    const token_trans_id = token;
    const [dataApi, setDataApi] = React.useState('');
    const data = dataApi;
    const [returncode, setReturnCode] = React.useState('');
    const item1 = [
        {
            itemName: 'Gò Vấp Cinema',
            itemdate: '2023-11-30',
            itemdateShowtime: '',
            itemmovieName: 'Cuộc đời của Chí Cao Phần 2',
            itemseatsIndex: 'E03',
            itemshowtime: '13:00',
        },
    ];
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
        let embeddata = `{ }`;
        let item = JSON.stringify(item1);
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
    const queryAPI = async () => {
        var apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
        const hmacInput =
            'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn' +
            '|' +
            '2554' +
            '|' +
            apptransid;
        const mac = CryptoJS.HmacSHA256(
            'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
            hmacInput,
        ).toString();
        const req = {
            app_id: '2554',
            app_trans_id: apptransid,
            app_user: 'ZaloDemoApp',
            mac: mac,
        };
        const res = await axios.post(
            'https://sb-openapi.zalopay.vn/v2/query',
            req,
        );
        if (res.data.return_code == 1) {
            console.log(res);
        }
    };
    const payOrder = (token) => {
        // token từ BE trả về nha
        const payZP = NativeModules.ZaloPayBridge;
        // console.log(token);
        console.log(returncode);
        console.log(token_trans_id);
        console.log(data);

        payZP.payOrder(token_trans_id);
    };

    // const queryCallback = async () => {
    //     var app_trans_id = `${moment().format('YYMMDD')}_${transID}`;
    //     // '23_1701088992969';
    //     // getCurrentDateYYMMDD() + '_' + new Date().getTime();
    //     const config = {
    //         app_id: 2554,
    //         key1: 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
    //         key2: 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf',
    //         endpoint: 'https://sb-openapi.zalopay.vn/v2/query',
    //     };
    //     const hmacInput =
    //         config.app_id + '|' + app_trans_id + '|' + config.key1;

    //     const dataCB = {
    //         app_id: config.app_id,
    //         app_trans_id: app_trans_id,
    //         app_time: new Date().getTime(),
    //         // mac: 'cbaa63b6fe08f27f67887a3e8ace4ec884966b909a90ea60d8d73435e4b9dbdd',
    //         mac: CryptoJS.HmacSHA256(config.key1, hmacInput).toString(),
    //     };
    //     console.log(dataCB);

    //     try {
    //         const body = Object.keys(dataCB)
    //             .map(
    //                 (key) =>
    //                     encodeURIComponent(key) +
    //                     '=' +
    //                     encodeURIComponent(dataCB[key]),
    //             )
    //             .join('&');

    //         const response = await fetch(config.endpoint, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type':
    //                     'application/x-www-form-urlencoded;charset=UTF-8',
    //             },
    //             body: body,
    //         });
    //         const resJson = await response.json(); // Phải sử dụng await ở đây để lấy dữ liệu JSON từ response
    //         console.log(resJson);
    //     } catch (e) {
    //         console.error('Error creating order:', e);
    //     }
    // };

    return (
        <ScrollView>
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.welcomeHead}>ZaloPay App To App Demo</Text>
                <Text style={styles.welcome}>Amount:</Text>
                <TextInput
                    onChangeText={(value) => setMoney(value)}
                    value={money}
                    keyboardType="numeric"
                    placeholder="Input amount"
                    style={styles.inputText}
                />
                <Button
                    title="Create order"
                    type="outline"
                    onPress={() => {
                        createOrder(money);
                    }}
                />
                <Text style={styles.welcome}>ZpTranstoken: {token}</Text>
                <Text style={styles.welcome}>returncode: {returncode}</Text>
                {returncode == 1 ? (
                    <Button
                        title="Pay order"
                        type="outline"
                        onPress={() => {
                            payOrder();
                            // queryAPI();
                        }}
                    />
                ) : null}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    welcomeHead: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    inputText: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center',
    },
});
