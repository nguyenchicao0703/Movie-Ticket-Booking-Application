import {
    StyleSheet,
    Text,
    View,
    Pressable,
    useWindowDimensions,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetCombo,
    setCombo,
    setTotalPayment,
} from '../../redux/slice/bookingSlice';

const ComboCard = ({ data, totalPayment }) => {
    const { width, fontScale } = useWindowDimensions();
    const textSizeComboContent = fontScale * 13;
    const textSizeButton = fontScale * 20;

    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();
    const changeStateSelector = useSelector(
        (state) => state.booking.changeState,
    );

    React.useEffect(() => {
        setQuantity(0);
        dispatch(resetCombo([]));
    }, [changeStateSelector]);

    const handleQuantityCombo = (operator) => {
        if (operator === '+') {
            setQuantity(quantity + 1);
            dispatch(setTotalPayment(totalPayment + Number(data.giasanpham)));
            dispatch(
                setCombo({
                    id: Number(data.id_combo),
                    soluong: 1,
                    image: data.hinhanh,
                    name: data.tensanpham,
                    price: data.giasanpham,
                }),
            );
        } else if (operator === '-') {
            if (quantity === 0) return;
            setQuantity(quantity - 1);
            dispatch(setTotalPayment(totalPayment - Number(data.giasanpham)));
            dispatch(
                setCombo({
                    id: Number(data.id_combo),
                    soluong: -1,
                    price: data.giasanpham,
                }),
            );
        }
    };

    return (
        <Pressable style={styles.container}>
            <Image
                style={{
                    width: '25%',
                    height: width * 0.33,
                    borderRadius: 10,
                    marginTop: 15,
                }}
                source={{ uri: data.hinhanh }}
            />
            <View
                style={{
                    flexDirection: 'column',
                    paddingLeft: 10,
                    marginTop: 10,
                    width: '75%',
                }}
            >
                <Text style={[styles.comboName, { fontSize: fontScale * 15 }]}>
                    {data.tensanpham}
                </Text>
                <Text
                    style={[
                        styles.comboContent,
                        { fontSize: textSizeComboContent },
                    ]}
                    numberOfLines={1}
                >
                    {data.giasanpham} đ
                </Text>
                <Text
                    style={[
                        styles.comboContent,
                        { fontSize: textSizeComboContent },
                    ]}
                    numberOfLines={3}
                >
                    {data.mota}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 5,
                    }}
                >
                    <Pressable style={[styles.buttonView, { borderRadius: 5 }]}>
                        <Text
                            style={[
                                styles.textButton,
                                { fontSize: textSizeButton },
                            ]}
                        >
                            {quantity}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonView, styles.downButton]}
                        onPress={() => handleQuantityCombo('-')}
                    >
                        <Text
                            style={[
                                styles.textButton,
                                { fontSize: textSizeButton },
                            ]}
                        >
                            -
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.buttonView, styles.upButton]}
                        onPress={() => handleQuantityCombo('+')}
                    >
                        <Text
                            style={[
                                styles.textButton,
                                { fontSize: textSizeButton },
                            ]}
                        >
                            +
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

export default ComboCard;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
        backgroundColor: Colors.DARK_BG,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 15,
    },
    comboName: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Bold,
    },
    comboContent: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
        lineHeight: 20,
    },
    buttonView: {
        width: 30,
        height: 30,
        backgroundColor: Colors.DEFAULT_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    downButton: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightWidth: 0.5,
        marginLeft: 15,
        borderLeftColor: Colors.DEFAULT_BLACK,
    },
    upButton: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    textButton: {
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.Regular,
    },
});
