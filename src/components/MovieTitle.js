import { Image, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, Images } from '../constants';

const MovieTitle = ({ title }) => {
    return (
        <View
            style={{
                width: '100%',
                height: 50,
                marginTop: 20,
                backgroundColor: Colors.DARK_INDIGO,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Image source={Images[3].image} style={{ marginLeft: 15 }} />
            <Text
                style={{
                    fontSize: 18,
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 15,
                    textTransform: 'uppercase',
                }}
                numberOfLines={1}
            >
                {title}
            </Text>
        </View>
    );
};

export default React.memo(MovieTitle);
