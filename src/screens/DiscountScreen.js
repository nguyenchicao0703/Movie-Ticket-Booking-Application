import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { HeaderImage, Colors, Fonts } from '../constants';
import { Header } from '../components';
import { ScrollView } from 'react-native-virtualized-view';

const DiscountScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header titleHeader={'Mã giảm giá'} navigation={navigation} />
            <View style={styles.body}>
                <Text style={styles.leftText}>Nhập một phiếu giảm giá</Text>
                <Text style={styles.leftText}>*Lưu ý:</Text>
                <Text style={styles.leftText}>
                    - Một vé chỉ được chọn một phiếu giảm giá
                </Text>
                <Text style={styles.leftText}>
                    - Một phiếu giảm giá chỉ sử dụng được một lần{' '}
                </Text>

                <ScrollView>
                    <View style={styles.detail}>
                        <View style={styles.detailLeft}>
                            <Text style={styles.detailTextTitle}>
                                Mã giảm giá:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Ngày hết hạn:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Số tiền giảm:
                            </Text>
                        </View>
                        <View style={styles.detailRight}>
                            <Text style={styles.detailText}>qoewuoq</Text>
                            <Text style={styles.detailText}>30/12/2024</Text>
                            <Text style={styles.detailText}>20.000 đ</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailLeft}>
                            <Text style={styles.detailTextTitle}>
                                Mã giảm giá:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Ngày hết hạn:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Số tiền giảm:
                            </Text>
                        </View>
                        <View style={styles.detailRight}>
                            <Text style={styles.detailText}>qoewuoq</Text>
                            <Text style={styles.detailText}>30/12/2024</Text>
                            <Text style={styles.detailText}>20.000 đ</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailLeft}>
                            <Text style={styles.detailTextTitle}>
                                Mã giảm giá:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Ngày hết hạn:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Số tiền giảm:
                            </Text>
                        </View>
                        <View style={styles.detailRight}>
                            <Text style={styles.detailText}>qoewuoq</Text>
                            <Text style={styles.detailText}>30/12/2024</Text>
                            <Text style={styles.detailText}>20.000 đ</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailLeft}>
                            <Text style={styles.detailTextTitle}>
                                Mã giảm giá:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Ngày hết hạn:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Số tiền giảm:
                            </Text>
                        </View>
                        <View style={styles.detailRight}>
                            <Text style={styles.detailText}>qoewuoq</Text>
                            <Text style={styles.detailText}>30/12/2024</Text>
                            <Text style={styles.detailText}>20.000 đ</Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailLeft}>
                            <Text style={styles.detailTextTitle}>
                                Mã giảm giá:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Ngày hết hạn:
                            </Text>
                            <Text style={styles.detailTextTitle}>
                                Số tiền giảm:
                            </Text>
                        </View>
                        <View style={styles.detailRight}>
                            <Text style={styles.detailText}>qoewuoq</Text>
                            <Text style={styles.detailText}>30/12/2024</Text>
                            <Text style={styles.detailText}>20.000 đ</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DiscountScreen;

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
        fontFamily: Fonts.Light,
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
        marginTop: 20,
    },
    ipt: {
        margin: 15,
        borderColor: Colors.DEFAULT_WHITE,
        borderWidth: 0.3,
        borderRadius: 10,
        fontFamily: Fonts.Medium,
        textAlign: 'left',
        paddingLeft: 15,
        color: Colors.DEFAULT_WHITE,
    },
    btn: {
        margin: 15,
        alignItems: 'center',
        backgroundColor: Colors.DARK_RED,
        justifyContent: 'center',
        height: 45,
        borderRadius: 40,
    },
    btnText: {
        fontFamily: Fonts.Medium,
        color: Colors.DEFAULT_WHITE,
    },
    detail: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        height: 132,
        margin: 15,
        marginBottom: 0,
        justifyContent: 'space-around',
    },
    detailLeft: { width: 100, alignItems: 'flex-start' },
    detailRight: {
        width: 100,
        alignItems: 'flex-end',
    },
    detailTextTitle: {
        fontFamily: Fonts.SemiBold,
        color: Colors.DEFAULT_BLACK,
        marginTop: 15,
    },
    detailText: {
        fontFamily: Fonts.Regular,
        marginTop: 15,
    },
});
