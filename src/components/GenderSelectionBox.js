import {
    StyleSheet,
    Text,
    View,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts } from '../constants';
const data = [
    { id: 1, gioitinh: 'Nam' },
    { id: 2, gioitinh: 'Nữ' },
    { id: 3, gioitinh: 'Khác' },
];
const GenderSelectionBox = () => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    const fontSize = height * 0.018;
    const [isClick, setIsClick] = useState(0);
    const handleButton = (index) => {
        console.log(index);
        setIsClick(index);
    };

    return (
        <View style={styles.gender}>
            <Text style={[styles.titleCheckbox, { fontSize: fontSize }]}>
                Giới tính
            </Text>
            <View style={{ flexDirection: 'row' }}>
                {data.map((value, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between',
                            width: '30%',
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                onPress={() => handleButton(index)}
                                style={[
                                    styles.checkBoxCircle,
                                    {
                                        width: width * 0.06,
                                        height: height * 0.03,
                                    },
                                ]}
                            >
                                {isClick === index ? (
                                    <View style={styles.inSideCircle} />
                                ) : null}
                            </Pressable>
                            <Text
                                style={{
                                    color: 'white',
                                    marginLeft: 10,
                                    fontFamily: Fonts.Regular,
                                    fontSize: fontSize,
                                }}
                            >
                                {value.gioitinh}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default GenderSelectionBox;

const styles = StyleSheet.create({
    gender: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    titleCheckbox: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
        width: '90%',
    },
    checkBoxCircle: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: Colors.DARK_RED,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inSideCircle: {
        width: '50%',
        height: '50%',
        backgroundColor: Colors.DARK_RED,
        borderRadius: 100,
    },
});
