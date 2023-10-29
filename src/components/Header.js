import {
    Image,
    Text,
    View,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, HeaderImage } from '../constants';

const Header = ({ titleHeader, navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const goBack = () => {
        navigation.goBack();
    };

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
                    onPress={goBack}
                >
                    <Image source={HeaderImage[0].image} />
                </Pressable>
                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        fontSize: fontScale * 21,
                        fontFamily: Fonts.Medium,
                        marginLeft: 20,
                        marginTop: 5,
                    }}
                >
                    {titleHeader}
                </Text>
                <Pressable
                    style={{ position: 'absolute', right: width * 0.02 }}
                    onPress={() => handleButtonMenu()}
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
