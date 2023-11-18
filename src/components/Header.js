import {
    Image,
    Text,
    View,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, HeaderImage } from '../constants';

const Header = ({
    titleHeader,
    onButtonBack,
    onButtonMenu,
    activatedTitleSeats, // Chỉ dùng ở màn hình Seat
    dateShowtime, // Chỉ dùng ở màn hình Seat
    showtimes, // Chỉ dùng ở màn hình Seat
}) => {
    const { width, height, fontScale } = useWindowDimensions();

    return (
        <View
            style={{
                width: '100%',
            }}
        >
            <View
                style={{
                    paddingVertical: height * 0.01,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    style={{ marginLeft: width * 0.02 + 5 }}
                    onPress={onButtonBack}
                >
                    <Image source={HeaderImage[0].image} />
                </Pressable>
                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        fontSize: !activatedTitleSeats
                            ? height * 0.027
                            : height * 0.023,
                        fontFamily: Fonts.Medium,
                        marginLeft: 20,
                        marginTop: !activatedTitleSeats ? 5 : 0,
                    }}
                >
                    {titleHeader}
                    {activatedTitleSeats ? (
                        <Text
                            style={{
                                color: Colors.LIGHT_SILVER,
                                fontSize: height * 0.02,
                                fontFamily: Fonts.Light,
                                marginLeft: 20,
                            }}
                        >
                            {'\n'}
                            {dateShowtime}, {showtimes}
                        </Text>
                    ) : null}
                </Text>
                <Pressable
                    style={{ position: 'absolute', right: width * 0.02 }}
                    onPress={onButtonMenu}
                >
                    <Image source={HeaderImage[1].image} />
                </Pressable>
            </View>
            <View
                style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: Colors.MEDIUM_GRAY_LINE,
                    opacity: 0.5,
                }}
            />
        </View>
    );
};

export default Header;
