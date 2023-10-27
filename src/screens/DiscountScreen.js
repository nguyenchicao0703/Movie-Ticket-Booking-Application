import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { DrawerImage, HeaderImage, Movies } from '../constants';
import { Colors, Fonts } from '../constants/index';

const DiscountScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeftView}>
                    <Image
                        style={styles.headerLeft}
                        source={HeaderImage[0].image}
                    />
                    <Text style={styles.leftText}>Mã giảm giá</Text>
                </View>
                <View style={styles.headerRightView}>
                    <Image
                        style={[
                            styles.headerRight,
                            { marginLeft: 20, marginRight: 15 },
                        ]}
                        source={HeaderImage[1].image}
                    />
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.leftText}>Nhập mã giảm giá</Text>
                <TextInput
                    placeholder="Mã giảm giá"
                    placeholderTextColor={Colors.DARK_GRAY}
                    style={styles.ipt}
                />
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText}>Xác nhận</Text>
                </Pressable>
                <View style={styles.detail}>
                    <View style={styles.detailLeft}>
                        <Text style={styles.detailTextTitle}>Mã giảm giá:</Text>
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
            </View>
        </View>
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
        fontFamily: Fonts.Medium,
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
        justifyContent: 'space-around',
    },
    detailLeft: { width: 110, alignItems: 'flex-start' },
    detailRight: {
        width: 110,
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
