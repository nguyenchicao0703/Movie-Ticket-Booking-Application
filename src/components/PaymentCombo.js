import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import React from 'react';
import { Colors, ComboImage, Fonts, PaymentImage } from '../constants';
import { useDispatch } from 'react-redux';

const PaymentCombo = ({ data }) => {
    const { width, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 15;
    console.log(data.id);
    const dispatch = useDispatch();
    const handleCancelCombo = () => {
        // dispatch(setCombo({ id: Number(data.id_combo), soluong: -1, cancel: '-' }))
    };

    return (
        <View
            key={data.id}
            style={{
                width: '100%',
                justifyContent: 'center',
                paddingVertical: 12,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: data.image }}
                    style={{ width: width * 0.15, height: width * 0.19 }}
                />
                <View
                    style={{
                        width: '80%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 5,
                    }}
                >
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize,
                                textTransform: 'uppercase',
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {data.name}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize,
                            },
                        ]}
                    >
                        {/* Giá: {amount} đ */}
                        Giá: đ
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize,
                            },
                        ]}
                    >
                        Số lượng: {data.soluong}
                    </Text>
                </View>
            </View>
            <Pressable
                style={[
                    styles.text,
                    {
                        fontSize,
                        alignSelf: 'center',
                    },
                ]}
                onPress={handleCancelCombo}
            >
                <Image
                    source={PaymentImage[2].image}
                    style={{ width: 14, height: 14 }}
                />
            </Pressable>
        </View>
    );
};

export default PaymentCombo;

const styles = StyleSheet.create({
    text: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Regular,
    },
});
