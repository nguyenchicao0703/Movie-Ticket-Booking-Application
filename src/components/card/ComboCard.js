import {
    StyleSheet,
    Text,
    View,
    Pressable,
    useWindowDimensions,
    Image,
} from 'react-native';
import React from 'react';
import { Colors, ComboImage, Fonts } from '../../constants';
const ComboCard = ({ data }) => {
    const { height, width } = useWindowDimensions();
    return (
        <View style={[styles.container, { height: height * 0.22 }]}>
            <Image
                style={{ width: '25%', height: '80%' }}
                source={ComboImage[0].image}
            />
            <View
                style={{
                    flexDirection: 'column',
                    height: '100%',
                    //padding: 10,
                    margin: 10,
                }}
            >
                <Text style={[styles.comboName, {}]}>{data.name}</Text>
                <Text style={[styles.comboContent, {}]}>{data.content1}</Text>
                <Text style={[styles.comboContent, {}]}>*{data.content2}</Text>
                <Text style={[styles.comboContent, {}]}>**{data.content3}</Text>
                <Text style={[styles.comboContent, {}]}>
                    ***{data.content4}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '30%',
                        margin: 5,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 5,
                            width: 30,
                            height: 30,
                            backgroundColor: Colors.DEFAULT_WHITE,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.DEFAULT_BLACK,
                                fontFamily: Fonts.Regular,
                                fontSize: 19,
                            }}
                        >
                            0
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Pressable style={styles.downButton}>
                            <Text
                                style={{
                                    color: Colors.DEFAULT_BLACK,
                                    fontSize: 20,
                                    fontFamily: Fonts.Medium,
                                }}
                            >
                                -
                            </Text>
                        </Pressable>
                        <Pressable style={styles.upButton}>
                            <Text
                                style={{
                                    color: Colors.DEFAULT_BLACK,
                                    fontSize: 20,
                                    fontFamily: Fonts.Medium,
                                }}
                            >
                                +
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ComboCard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
        backgroundColor: Colors.DARK_BG,
        flexDirection: 'row',
    },
    brandMTB: {
        color: Colors.DARK_RED,
        fontFamily: Fonts.Medium,
        marginLeft: 10,
    },
    comboName: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        marginLeft: 5,
    },
    comboContent: {
        color: Colors.LIGHT_GRAY,
        marginLeft: 5,
        fontFamily: Fonts.Light,
        width: '100%',
        fontSize: 13,
    },
    downButton: {
        height: 30,
        width: 30,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,

        borderLeftColor: Colors.DEFAULT_BLACK,
    },
    upButton: {
        height: 30,
        width: 30,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
