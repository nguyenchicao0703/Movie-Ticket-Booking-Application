import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    Modal,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { Header } from '../components';
import { ScrollView } from 'react-native-virtualized-view';
import axiosClient from '../api/axiosClient';
import discountAPI from '../api/discountAPI';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';
import { useDispatch } from 'react-redux';
import {
    setDiscountCode,
    setDiscountTime,
    setDiscountPayment,
} from '../redux/slice/discountSlice';
const DiscountScreen = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const [data, setData] = useState([]);
    const [discountId, setDiscountId] = useState([]);
    const [discountDate, setDiscountDate] = useState(['']);
    const [discountPrice, setDiscountPrice] = useState(0);
    const dispatch = useDispatch();
    const dataUser = useSelector(usersSelector);
    console.log(dataUser.users.data.id_user);
    const user_id = dataUser.users.data.id_user;
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
        const response = await discountAPI.getbyID(user_id);
        console.log(response.data);
        setData(response.data);
    };
    const modalView = (item) => {
        setModalVisible(true);
        setDiscountId(item.magiamgia);
        setDiscountDate(item.ngayhethan);
        setDiscountPrice(item.sotiengiam);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    const navigationModalDiscountToPayment = () => {
        setModalVisible(false);
        dispatch(setDiscountCode(discountId));
        dispatch(setDiscountTime(discountDate));
        dispatch(setDiscountPayment(discountPrice));
        navigation.goBack(null);
    };
    const dataDiscount = data;
    const [modalVisible, setModalVisible] = useState(false);

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
                        <Pressable
                            key={item.id_giamgia}
                            onPress={() => modalView(item)}
                        >
                            <Modal transparent={true} visible={modalVisible}>
                                <View style={styles.centeredView}>
                                    <View
                                        style={[
                                            styles.modalView,
                                            { height: height * 0.18 },
                                        ]}
                                    >
                                        <View
                                            key={item.id_giamgia}
                                            style={[
                                                styles.centeredView,
                                                {
                                                    width: '130%',
                                                    marginTop: '5%',
                                                },
                                            ]}
                                        >
                                            <View style={[styles.detailLeft]}>
                                                <Text
                                                    style={[
                                                        styles.detailTextTitle,
                                                        {
                                                            color: Colors.LIGHT_SILVER,
                                                        },
                                                    ]}
                                                >
                                                    Mã giảm giá:
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.detailTextTitle,
                                                        {
                                                            color: Colors.LIGHT_SILVER,
                                                        },
                                                    ]}
                                                >
                                                    Ngày hết hạn:
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.detailTextTitle,
                                                        {
                                                            color: Colors.LIGHT_SILVER,
                                                        },
                                                    ]}
                                                >
                                                    Số tiền giảm:
                                                </Text>
                                            </View>
                                            <View style={[styles.detailRight]}>
                                                <Text
                                                    style={[
                                                        styles.detailText,
                                                        {
                                                            color: Colors.DEFAULT_WHITE,
                                                        },
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    {discountId}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.detailText,
                                                        {
                                                            color: Colors.DEFAULT_WHITE,
                                                        },
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    {discountDate}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.detailText,
                                                        {
                                                            color: Colors.DEFAULT_WHITE,
                                                        },
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    {discountPrice} đ
                                                </Text>
                                            </View>
                                        </View>

                                        <View
                                            style={{
                                                width: '90%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Pressable
                                                onPress={handleCancel}
                                                style={[
                                                    styles.buttonClose,

                                                    ,
                                                    {
                                                        width: width * 0.41,
                                                        height: height * 0.05,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.textStyle,
                                                        {
                                                            fontSize:
                                                                height * 0.02,
                                                            color: Colors.DARK_RED,
                                                        },
                                                    ]}
                                                >
                                                    Hủy
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={
                                                    navigationModalDiscountToPayment
                                                }
                                                style={[
                                                    styles.button,
                                                    {
                                                        width: width * 0.41,
                                                        height: height * 0.05,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.textStyle,
                                                        {
                                                            fontSize:
                                                                height * 0.02,
                                                        },
                                                    ]}
                                                >
                                                    Xác nhận chọn{' '}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            {item.status != 1 ? null : (
                                <View style={styles.detail}>
                                    <View style={styles.detailLeft}>
                                        <Text style={styles.modalText}>
                                            Mã giảm giá:
                                        </Text>
                                        <Text style={styles.modalText}>
                                            Ngày hết hạn:
                                        </Text>
                                        <Text style={styles.modalText}>
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
                            )}
                        </Pressable>
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
    modalView: {
        backgroundColor: Colors.DARK_GRAY,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        borderRadius: 20,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.DARK_RED,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    buttonClose: {
        borderRadius: 20,
        borderColor: Colors.DARK_RED,
        borderWidth: 1,
        elevation: 2,
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        fontFamily: Fonts.SemiBold,
    },
    modalText: {
        color: Colors.DARK_GRAY,
        fontFamily: Fonts.Light,
        marginTop: 0,
        justifyContent: 'space-around',
    },
    textStyle: {
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.SemiBold,
        fontSize: 18,
    },
    modalTitle: {
        textAlign: 'center',
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.SemiBold,
    },
});
