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

const PaymentCombo = ({ name, number, amount }) => {
    const { width, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 15;

    return (
        <View
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
                    source={ComboImage[0].image}
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
                        {name}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize,
                            },
                        ]}
                    >
                        Giá: {amount} đ
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize,
                            },
                        ]}
                    >
                        Số lượng: {number}
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
