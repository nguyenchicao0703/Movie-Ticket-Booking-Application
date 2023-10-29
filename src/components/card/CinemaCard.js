import {
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants';
const CinemaCard = ({ data, onPress, style }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 18;
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.container, { height: height * 0.08 }]}>
                <Text style={[styles.brandMTB, { fontSize }]}>MTB</Text>
                <Text style={[styles.cinemaName, { fontSize }]}>
                    {data.name}
                </Text>
            </View>
        </Pressable>
    );
};

export default CinemaCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.MEDIUM_GRAY_LINE,
        backgroundColor: Colors.DARK_BG,
        flexDirection: 'row',
    },
    brandMTB: {
        color: Colors.DARK_RED,
        fontFamily: Fonts.Medium,
        marginLeft: 10,
    },
    cinemaName: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        marginLeft: 5,
    },
});
