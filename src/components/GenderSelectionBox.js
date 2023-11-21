import {
    StyleSheet,
    Text,
    View,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts } from '../constants';
import { usersSelector } from '../redux/selectors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const data = [
    { id: 1, gioitinh: 'Nam' },
    { id: 2, gioitinh: 'Nữ' },
    { id: 3, gioitinh: 'Khác' },
];
const GenderSelectionBox = ({ marginLeft }) => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    const fontSize = height * 0.018;
    const [isClick, setIsClick] = useState(0);

    const navigation = useNavigation();

    const dataUser = useSelector(usersSelector);
    const gender = 1;
    // const gender = dataUser.users.data.gender;
    // console.log({ gender });
    const handleButton = (index) => {
        // console.log({ index });
        setIsClick(index);
    };

    useEffect(() => {
        setIsClick(gender);
    }, []);

    console.log({ isClick });

    return (
        <View style={[styles.gender, { marginLeft }]}>
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
                        }}
                    >
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
                                marginRight: 30,
                                fontFamily: Fonts.Regular,
                                fontSize: fontSize,
                            }}
                        >
                            {value.gioitinh}
                        </Text>
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
        marginTop: 15,
    },
    titleCheckbox: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
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
