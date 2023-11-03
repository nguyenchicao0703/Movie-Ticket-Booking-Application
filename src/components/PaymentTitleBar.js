import { Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const PaymentTitleBar = ({ title }) => {
    const { width, fontScale } = useWindowDimensions();
    return (
        <View
            style={{
                backgroundColor: Colors.DARK_INDIGO,
                width: '100%',
                height: width * 0.15,
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    color: Colors.LIGHT_GRAY,
                    fontSize: fontScale * 18,
                    fontFamily: Fonts.Regular,
                    marginLeft: 10,
                    textTransform: 'uppercase',
                }}
            >
                {title}
            </Text>
        </View>
    );
};

export default PaymentTitleBar;
