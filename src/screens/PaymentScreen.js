import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    Pressable,
    ScrollView,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, HomeImage, PaymentImage } from '../constants';
import {
    Header,
    PaymentCombo,
    PaymentContentBar,
    PaymentTitleBar,
    AuthAccountButton,
} from '../components';

const PaymentScreen = ({ navigation }) => {
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
        fontFamily: Fonts.Regular,
    },
    textContent: {
        fontFamily: Fonts.Regular,
        fontSize: 13,
    },
});
