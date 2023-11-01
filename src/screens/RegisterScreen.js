import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
    StatusBar,
    Platform,
    useWindowDimensions,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { Images, Fonts, Colors, BottomTabImage } from '../constants';
import {
    AuthAccountButton,
    BackButton,
    Button,
    GenderSelectionBox,
    Input,
    TextTitle,
} from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({ navigation }) => {
    const [unTickedRule, setUnTickedRule] = useState(true);
    const [date, setDate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState('');
    const toggleDatepicker = () => {
        setshowPicker(!showPicker);
    };
    const { height, width, scale, fontScale } = useWindowDimensions();

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
                <BackButton onPress={backToLogin} />
                <TextTitle text={'Đăng ký'} />
                <View style={styles.container}>
                    <View style={styles.formRegister}>
                        <View style={styles.containerInput}>
                            <Input label={'Họ và tên'} />
                        </View>
                        <View style={styles.containerInput}>
                            <Input
                                keyboardType={'numeric'}
                                label={'Số điện thoại'}
                            />
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
                                        justifyContent: 'flex-end',
                                    }}
                                    onPress={toggleDatepicker}
                                >
                                    <Input
                                        value={dayOfBirth}
                                        editable={false}
                                        onChangeText={setDayOfBirth}
                                        label={'Ngày sinh'}
                                    />
                                    <Image
                                        style={{
                                            position: 'absolute',
                                            width: width * 0.05,
                                        }}
                                        source={BottomTabImage[6].image}
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>

                    <GenderSelectionBox />

                    <View style={styles.groupRule}>
                        {unTickedRule ? (
                            <Pressable
                                onPress={() => setUnTickedRule(!unTickedRule)}
                                style={[
                                    styles.ButtonCheckBoxRule,
                                    {
                                        width: width * 0.06,
                                        height: height * 0.03,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: height * 0.018,
                                    }}
                                >
                                    ✓
                                </Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => setUnTickedRule(!unTickedRule)}
                                style={[
                                    styles.ButtonCheckBoxRule,
                                    {
                                        width: width * 0.06,
                                        height: height * 0.03,
                                    },
                                ]}
                            ></Pressable>
                        )}
                        <Text
                            style={[
                                styles.textRule,
                                { fontSize: height * 0.018 },
                            ]}
                        >
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

                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <AuthAccountButton
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
        width: '95%',
    },
    text: {
        color: Colors.LIGHT_GRAY,
        paddingLeft: 10,
        zIndex: 3,
        fontFamily: Fonts.Light,
    },
    input: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 40,
        borderColor: Colors.DEFAULT_WHITE,
        color: Colors.DEFAULT_WHITE,
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
        fontFamily: Fonts.Regular,
    },
    groupCheckbox: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    ButtonCheckBox: {
        backgroundColor: 'transparent',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: Colors.DARK_RED,
        borderWidth: 2,
    },
    ButtonChecked: {
        backgroundColor: Colors.DARK_RED,
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: Colors.DEFAULT_WHITE,
        borderWidth: 2,
    },
    miniGroupCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        padding: 10,
    },
    textCheckbox: {
        color: Colors.DEFAULT_WHITE,
        paddingLeft: 10,
        fontFamily: Fonts.Regular,
    },

    groupRule: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
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
        fontFamily: Fonts.Light,
        fontSize: 14,
    },
    containerInput: {
        marginTop: 19,
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },

    ButtonCheckBoxRule: {
        backgroundColor: Colors.DEFAULT_WHITE,
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
