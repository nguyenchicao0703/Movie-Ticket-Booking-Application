import { Text } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const NoShowtimeMessage = () => {
    return (
        <Text
            style={{
                textAlign: 'center',
                color: Colors.OPACITY_MEDIUM_GRAY_LINE,
                fontFamily: Fonts.Light,
                fontSize: 15,
                marginTop: 10,
            }}
        >
            Ôi không, Hôm nay chưa có suất chiếu
        </Text>
    );
};

export default NoShowtimeMessage;
