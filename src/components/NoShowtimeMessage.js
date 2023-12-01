import { Text } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';

const NoShowtimeMessage = ({ title }) => {
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
            {title}
        </Text>
    );
};

export default React.memo(NoShowtimeMessage);
