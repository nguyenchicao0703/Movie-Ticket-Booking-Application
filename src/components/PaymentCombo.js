import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, ComboImage, Fonts } from '../constants';

const PaymentCombo = ({ name, number, amount }) => {
    const { width, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 18;

    return (
        <View
            style={{
                width: '100%',
                justifyContent: 'center',
                paddingVertical: 16,
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
                    style={{ width: width * 0.13, height: width * 0.17 }}
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
                        {amount} đ
                    </Text>
                </View>
            </View>
            <Text
                style={[
                    styles.text,
                    {
                        fontSize,
                        alignSelf: 'center',
                    },
                ]}
            >
                {number}
            </Text>
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
