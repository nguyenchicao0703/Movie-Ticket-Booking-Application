import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts } from '../constants';
const data = [
    { id: 1, gioitinh: 'Nam' },
    { id: 2, gioitinh: 'Nữ' },
    { id: 3, gioitinh: 'Khác' },
];
const GenderSelectionBox = () => {
    const [isClick, setIsClick] = useState(0);
    const handleButton = (index) => {
        console.log(index);
        setIsClick(index);
    };

    return (
        <View style={styles.sex}>
            <Text style={styles.titleCheckbox}>Giới tính</Text>
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
                                style={styles.checkBoxCircle}
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
    sex: {
        width: '86%',
        marginTop: 10,
    },
    titleCheckbox: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
    },
    checkBoxCircle: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: Colors.DARK_RED,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inSideCircle: {
        width: 10,
        height: 10,
        backgroundColor: Colors.DARK_RED,
        borderRadius: 100,
    },
});
