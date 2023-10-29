import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    Image,
    Pressable,
    StatusBar,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Images, Fonts, Colors, BottomTabImage } from '../constants';
import { BackBtn, Button, Input } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';

const data = [
    { id: 1, gioitinh: 'Nam' },
    { id: 2, gioitinh: 'Nữ' },
    { id: 3, gioitinh: 'Khác' },
];

const RegisterScreen = ({ navigation }, props) => {
    const [unTickedRule, setUnTickedRule] = useState(true);
    const [isClick, setIsClick] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState('');

    const toggleDatepicker = () => {
        setshowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDayOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatepicker();
        }
    };
    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}-${month}-${year}`;
    };
    const clickChangeAuthOTPScr = () => {
        navigation.navigate('AuthOTP');
    };
    const backToLogin = () => {
        navigation.goBack();
    };
    const handleButton = (index) => {
        console.log(index);
        setIsClick(index);
    };

    return (
        <View>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <ImageBackground
                style={styles.backgroudImage}
                source={Images[4].image}
            >
                <BackBtn onPress={backToLogin} />
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Đăng ký</Text>

                    <View style={styles.formRegister}>
                        <View style={styles.containerInput}>
                            <Input label={'Họ và tên'} />
                        </View>
                        <View style={styles.containerInput}>
                            <Input label={'Số điện thoại'} />
                        </View>
                        <View style={styles.containerInput}>
                            <Input label={'Email'} />
                        </View>
                        <View style={styles.containerInput}>
                            {showPicker && (
                                <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={date}
                                    onChange={onChange}
                                />
                            )}
                            {!showPicker && (
                                <Pressable
                                    style={{
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        color: Colors.DEFAULT_WHITE,
                                    }}
                                    onPress={toggleDatepicker}
                                >
                                    <Text
                                        style={{
                                            color: Colors.DEFAULT_WHITE,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Ngày sinh:
                                    </Text>
                                    <View
                                        style={{
                                            width: '40%',
                                            padding: 10,
                                            borderRadius: 5,
                                            marginLeft: 15,
                                            flexDirection: 'row',
                                            marginTop: 10,
                                        }}
                                    >
                                        <TextInput
                                            style={{
                                                color: Colors.DEFAULT_WHITE,
                                                height: 35,
                                            }}
                                            placeholder="Chọn ngày sinh"
                                            placeholderTextColor={
                                                Colors.LIGHT_GRAY
                                            }
                                            onChangeText={setDayOfBirth}
                                            editable={false}
                                            value={dayOfBirth}
                                        ></TextInput>
                                        <Image
                                            source={BottomTabImage[6].image}
                                        />
                                    </View>
                                </Pressable>
                            )}
                        </View>
                    </View>
                    <Text style={styles.titleCheckbox}>Giới tính</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {data.map((value, index) => (
                            <View key={index} style={{ flexDirection: 'row' }}>
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
                                    }}
                                >
                                    {value.gioitinh}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.groupRule}>
                        {unTickedRule ? (
                            <Pressable
                                onPress={() => setUnTickedRule(!unTickedRule)}
                                style={styles.ButtonCheckBoxRule}
                            >
                                <Text style={{ textAlign: 'center' }}>✓</Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => setUnTickedRule(!unTickedRule)}
                                style={styles.ButtonCheckBoxRule}
                            ></Pressable>
                        )}
                        <Text style={styles.textRule}>
                            Khi đăng ký, tối đã xem xét và đồng ý với{' '}
                            <Text style={styles.textAttention}>
                                điều khoản sử dụng
                            </Text>{' '}
                            và{' '}
                            <Text style={styles.textAttention}>
                                {' '}
                                chính sách bảo mật
                            </Text>{' '}
                            của MTB Cinema.
                        </Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Button
                            onPress={clickChangeAuthOTPScr}
                            text={'Đăng ký'}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    backgroudImage: {
        width: '100%',
        height: '100%',
    },
    textTitle: {
        fontSize: 30,
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.Bold,
    },
    formRegister: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: Colors.LIGHT_GRAY,
        paddingLeft: 10,
        zIndex: 3,
        fontFamily: Fonts.Light,
    },
    titleCheckbox: {
        color: Colors.LIGHT_GRAY,
        paddingLeft: 36,
        fontFamily: Fonts.Light,
    },
    groupRule: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        paddingTop: 20,
    },
    textAttention: {
        color: Colors.DARK_RED,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.DARK_RED,
        fontFamily: Fonts.Regular,
    },
    textRule: {
        color: Colors.DEFAULT_WHITE,
        paddingLeft: 10,
        fontFamily: Fonts.Regular,
    },
    containerInput: {
        marginTop: 20,
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
    },
    checkBoxCircle: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: 'red',
        marginLeft: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonCheckBoxRule: {
        backgroundColor: Colors.DEFAULT_WHITE,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    inSideCircle: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 100,
    },
});
