import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, HomeImage } from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

const MovieSelectCard = () => {
    const { width, height, fontScale } = useWindowDimensions();
    const fontSize = fontScale * 14;
    return (
        <Pressable
            style={{
                flex: 1,
                backgroundColor: Colors.DARK_BG,
                flexDirection: 'row',
            }}
        >
            <Image
                source={HomeImage[1].image}
                style={{
                    borderRadius: 5,
                    marginLeft: width * 0.035,
                    width: 128,
                    height: 220,
                }}
            />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        fontSize: fontScale * 16,
                        fontFamily: Fonts.Bold,
                        maxWidth: width / 2 + 30,
                    }}
                >
                    SPIDER-MAN NO WAY HOME
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    Thời lượng: 120 phút
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    Khởi chiếu: 15/09/2023
                </Text>
                <Text style={[styles.text, { fontSize }]}>
                    Thể loại: Adventure/Superhero
                </Text>
                <LinearGradient
                    colors={[Colors.DARK_RED, '#FF6666']}
                    locations={[0.35, 1]}
                    style={{
                        width: 175,
                        height: 45,
                        backgroundColor: Colors.DARK_RED,
                        justifyContent: 'center',
                        borderRadius: 40,
                        marginTop: 10,
                    }}
                >
                    <Pressable>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: Colors.DEFAULT_WHITE,
                                fontFamily: Fonts.Medium,
                                fontSize: fontScale * 16,
                            }}
                        >
                            Đặt vé
                        </Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </Pressable>
    );
};

export default MovieSelectCard;

const styles = StyleSheet.create({
    text: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        marginTop: 10,
    },
});
