import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, ComboImage, Fonts } from '../constants';

const PaymentCombo = ({ name, num, amount }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    return (
        <View
            style={[
                {
                    flex: 1,

                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginEnd: 10,
                    borderBottomColor: Colors.MEDIUM_GRAY_LINE,
                    borderBottomWidth: 0.3,
                },
            ]}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{
                        marginLeft: width * 0.035,
                        width: width * 0.1,
                        height: height * 0.08,
                        borderRadius: 7,
                        margin: 10,
                    }}
                    source={ComboImage[0].image}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        marginLeft: 5,
                        alignSelf: 'center',
                    }}
                >
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>{amount}</Text>
                </View>
            </View>
            <Text style={styles.text}>{num}</Text>
        </View>
    );
};

export default PaymentCombo;

const styles = StyleSheet.create({
    text: {
        textTransform: 'uppercase',
        fontFamily: Fonts.Regular,
        color: Colors.DEFAULT_WHITE,
        fontSize: 13,
    },
});
