import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { Header } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import axiosClient from '../api/axiosClient';
import discountAPI from '../api/discountAPI';

const DiscountScreen = ({ navigation }) => {
    const [data, setData] = useState();
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const response = await discountAPI.getbyID('2');
        console.log(response.data);
        setData(response.data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                titleHeader={'Phiếu giảm giá'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <View style={styles.body}>
                <Text style={styles.leftText}>Nhập một phiếu giảm giá</Text>
                <Text style={styles.leftText}>*Lưu ý:</Text>
                <Text style={styles.leftText}>
                    - Một vé chỉ được chọn một phiếu giảm giá
                </Text>
                <Text style={styles.leftText}>
                    - Một phiếu giảm giá chỉ sử dụng được một lần
                </Text>

                <ScrollView style={styles.scroll}>
                    {data.map((item) => (
                        <View key={item.id_giamgia} style={styles.detail}>
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
                                <Text
                                    style={styles.detailText}
                                    numberOfLines={1}
                                >
                                    {item.magiamgia}
                                </Text>
                                <Text
                                    style={styles.detailText}
                                    numberOfLines={1}
                                >
                                    {item.ngayhethan}
                                </Text>
                                <Text
                                    style={styles.detailText}
                                    numberOfLines={1}
                                >
                                    {item.sotiengiam} đ
                                </Text>
                            </View>
                        </View>
                    ))}
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
    scroll: {
        paddingTop: 20,
        marginBottom: 20,
    },
    headerLeft: {
        width: 22,
        height: 22,
        marginLeft: 15,
    },
    leftText: {
        marginLeft: 15,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        fontSize: 15,
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
        flexDirection: 'row',
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        height: 132,
        marginBottom: 10,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    detailLeft: {
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    detailRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginVertical: 15,
        maxWidth: 200,
    },
    detailTextTitle: {
        fontFamily: Fonts.SemiBold,
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
    },
    detailText: {
        fontFamily: Fonts.Regular,
        fontSize: 15,
        color: Colors.DEFAULT_BLACK,
    },
});
