import {
    StyleSheet,
    Text,
    View,
    Pressable,
    useWindowDimensions,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, ComboImage, Fonts } from '../../constants';

const ComboCard = ({ data }) => {
    const { height, width, fontScale } = useWindowDimensions();
    const textSizeComboContent = fontScale * 13;
    const textSizeButton = fontScale * 20;

    const [quantity, setQuantity] = useState(0);

    const handleQuantityCombo = (operator) => {
        operator === '+'
            ? setQuantity(quantity + 1)
            : quantity === 0
            ? null
            : setQuantity(quantity - 1);
    };

    return (
        <Pressable style={styles.container}>
            <Image
                style={{
                    width: '25%',
                    height: width * 0.33,
                    borderRadius: 10,
                    marginTop: 15,
                }}
                source={ComboImage[0].image}
            />
            <View
                style={{
                    flexDirection: 'column',
                    paddingLeft: 10,
                    marginTop: 10,
                    width: '75%',
                }}
            >
                <Text style={[styles.comboName, { fontSize: fontScale * 15 }]}>
                    {data.name}
                </Text>
                <Text
                    style={[
                        styles.comboContent,
                        { fontSize: textSizeComboContent },
                    ]}
                    numberOfLines={5}
                >
                    {data.content}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 5,
                    }}
                >
                    <Pressable style={[styles.buttonView, { borderRadius: 5 }]}>
                        <Text
                            style={[
                                styles.textButton,
                                { fontSize: textSizeButton },
                            ]}
                        >
                            {quantity}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonView, styles.downButton]}
                        onPress={() => handleQuantityCombo('-')}
                    >
                        <Text
                            style={[
                                styles.textButton,
                                { fontSize: textSizeButton },
                            ]}
                        >
                            -
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.buttonView, styles.upButton]}
                        onPress={() => handleQuantityCombo('+')}
                    >
                        <Text
                            style={[
                                styles.textButton,
                                { fontSize: textSizeButton },
                            ]}
                        >
                            +
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

export default ComboCard;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
        backgroundColor: Colors.DARK_BG,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 15,
    },
    comboName: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Bold,
    },
    comboContent: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
        lineHeight: 20,
    },
    buttonView: {
        width: 30,
        height: 30,
        backgroundColor: Colors.DEFAULT_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    downButton: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightWidth: 0.5,
        marginLeft: 15,
        borderLeftColor: Colors.DEFAULT_BLACK,
    },
    upButton: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    textButton: {
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.Regular,
    },
});
