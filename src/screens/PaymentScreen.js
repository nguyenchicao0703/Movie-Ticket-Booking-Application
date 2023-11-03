import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, HomeImage } from '../constants';
import { Header } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import PaymentTitleBar from '../components/PaymentTitleBar';
import PaymentContentBar from '../components/PaymentContentBar';
import PaymentCombo from '../components/PaymentCombo';
import AuthAccountButton from '../components/AuthAccountButton';
import ZaloPayment from '../components/ZaloPayment';

const PaymentScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonNavigation = (router) => {
        navigation.navigate(router);
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
                        width: '100%',
                    }}
                >
                    <Image
                        style={{
                            marginLeft: width * 0.035,
                            width: width * 0.32,
                            height: height * 0.23,
                            borderRadius: 5,
                        }}
                        source={HomeImage[1].image}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            height: '100%',
                            width: width * 0.7,
                            padding: 15,
                            margin: 10,
                        }}
                    >
                        <Text
                            style={[
                                styles.comboContent,
                                {
                                    fontSize: fontScale * 18,
                                    fontFamily: Fonts.Bold,
                                },
                            ]}
                        >
                            SPIDER-MAN NO WAY HOME
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                styles.textContent,
                                {},
                            ]}
                        >
                            07 tháng 10, 2023
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                styles.textContent,
                                {},
                            ]}
                        >
                            15:00 ~ 17:11
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                styles.textContent,
                                {},
                            ]}
                        >
                            MTB Gò Vấp
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                styles.textContent,
                                {},
                            ]}
                        >
                            Ghế: H18, H19
                        </Text>
                        <Text
                            style={[
                                styles.comboContent,
                                styles.textContent,
                                { color: Colors.DARK_RED },
                            ]}
                        >
                            Tổng thanh toán: 590.000 đ
                        </Text>
                    </View>
                </View>
                <PaymentTitleBar title={'Thông tin vé '} />
                <PaymentContentBar content={'Số lượng'} num={'3'} />
                <PaymentContentBar content={'Tổng'} num={'220.000 đ'} />
                <PaymentTitleBar title={'Thông tin bắp nước'} />
                <PaymentCombo
                    name={'BABY SHARK SINGLE COMBO '}
                    amount={'195.000 đ'}
                    num={'1'}
                />
                <PaymentCombo
                    name={'BABY SHARK SINGLE COMBO '}
                    amount={'195.000 đ'}
                    num={'1'}
                />
                <Pressable onPress={() => handleButtonNavigation('Discount')}>
                    <PaymentContentBar content={'Phiếu giảm giá'} num={'>'} />
                </Pressable>
                {/* Change */}
                <PaymentTitleBar title={'Tổng kết'} />
                <PaymentContentBar
                    content={'Giá vé bao gồm F&B'}
                    num={'610.000 đ'}
                />
                <PaymentContentBar
                    content={'Số tiền được giảm giá'}
                    num={'20.000 đ'}
                />
                <PaymentContentBar content={'Tổng tiền'} num={'590.000 đ'} />
                <PaymentTitleBar title={'Thanh toán'} />
                <ZaloPayment />
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <AuthAccountButton
                        onPress={() => handleButtonNavigation('Bill')}
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
        fontFamily: Fonts.Light,
        width: '100%',
    },
    textContent: {
        fontFamily: Fonts.Regular,
        fontSize: 13,
    },
});
