import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Pressable,
    StatusBar,
    useWindowDimensions,
    Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Images, Fonts, Colors } from '../constants';
import { AuthAccountButton, BackButton, Input, TextTitle } from '../components';
import usersAPI from '../api/usersAPI';
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterScreen = ({ navigation }) => {
    const [unTickedRule, setUnTickedRule] = useState(true);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [checkpassword, setCheckpassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [countdown, setCountdown] = useState(2);
    const [error, setError] = useState('');
    const { height, width, scale, fontScale } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);
    const backToLogin = () => {
        navigation.goBack();
    };

    const registerUser = async (phone, password) => {
        try {
            const response = await usersAPI.postRegisterUserWithPhoneNumber(
                phone,
                password,
            );
            return response;
        } catch (error) {
            console.log('Error fetching register', error);
        }
    };

    const handlePhoneChange = (text) => {
        setPhone(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const handleCheckPasswordChange = (text) => {
        setCheckpassword(text);
    };
    console.log(password);
    const handleSubmit = () => {
        if (!unTickedRule) {
            setError(
                'Bạn hãy đồng ý với điều khoản của chúng tôi để tiếp tục!',
            );
            return;
        }
        if (phone.trim() === '') {
            setError('Số điện thoại bị để trống! ');
            return;
        }

        if (!phone.startsWith('0')) {
            setError('Số điện thoại phải bắt đầu bằng số 0!');
            return;
        }
        if (phone.length > 12 || phone.length < 10) {
            setError('Số điện thoại phải dài từ 10-12 ký tự!');
            return;
        }
        if (password.trim() === '') {
            setError('Mật khẩu bị để trống!');
            return;
        }
        if (password.length > 12 || password.length < 8) {
            setError('Mật khẩu phải dài từ 8-12 ký tự');
            return;
        }
        if (checkpassword.trim() === '') {
            setError('Xác nhận mật khẩu bị để trống!');
            return;
        }
        if (password != checkpassword) {
            setError('Mật khẩu xác nhận không giống!');
            return;
        }

        usersAPI
            .postCheckPhoneNumber(phone)
            .then((Response) => {
                // Handle successful phone number check
                console.log('Phone number check success:', Response);

                if (Response.status) {
                    registerUser(phone, password)
                        .then((Response) => {
                            console.log('Success:', Response);
                            if (Response.status) {
                                setIsLoading(true);
                                setTimeout(() => {
                                    setIsLoading(false);
                                    navigation.navigate('Login');
                                }, 1000);
                            } else {
                                setError('Số điện thoại đã được đăng ký!');
                                return;
                            }

                            // Handle successful registration
                        })
                        .catch((registerError) => {
                            // Handle registration error
                            console.error('Registration error:', registerError);
                            setIsLoading(false);
                        });
                } else if (Response.status === false) {
                    // Số điện thoại chưa tồn tại
                    setError('Số điện thoại đã tồn tại!');
                    setIsLoading(false);
                }
            })
            .catch((checkError) => {
                // Handle phone number check error
                console.error('Phone number check error:', checkError);
                setIsLoading(false);
            });
    };
    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={isLoading}
                textContent={'Đăng ký thành công'}
                textStyle={{ color: '#FFF' }}
                size={'slide'}
                color="#B73131"
                animation="fade"
                overlayColor="#1E1F27"
            />
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
                            <Input
                                keyboardType={'numeric'}
                                label={'Số điện thoại'}
                                value={phone}
                                onChangeText={handlePhoneChange}
                            />
                        </View>
                    </View>
                    <View style={styles.formRegister}>
                        <View style={styles.containerInput}>
                            <Input
                                label={'Mật khẩu'}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>

                    <View style={styles.formRegister}>
                        <View style={styles.containerInput}>
                            <Input
                                label={'Xác nhận mật khẩu'}
                                value={checkpassword}
                                onChangeText={handleCheckPasswordChange}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>

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
                    {error !== '' && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}

                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <AuthAccountButton
                            onPress={handleSubmit}
                            text={'Đăng ký'}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

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
        marginLeft: 10,
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
        marginLeft: 10,
        marginTop: -10,
        fontSize: 17,
        fontFamily: Fonts.Regular,
    },
    ButtonCheckBox: {
        backgroundColor: 'transparent',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: Colors.DARK_RED,
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
        marginLeft: 10,
        fontFamily: Fonts.Regular,
    },
    groupRule: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 30,
        marginRight: 15,
    },
    textAttention: {
        color: Colors.DARK_RED,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.DARK_RED,
        fontFamily: Fonts.Regular,
    },
    textRule: {
        color: Colors.DEFAULT_WHITE,
        marginLeft: 10,
        fontFamily: Fonts.Light,
        fontSize: 14,
    },
    containerInput: {
        marginTop: 15,
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 40,
        height: '70%',
    },

    ButtonCheckBoxRule: {
        backgroundColor: Colors.DEFAULT_WHITE,
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        marginBottom: 20,
        color: Colors.DEFAULT_BLACK,
    },
    errorText: {
        color: 'yellow',
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: Fonts.Regular,
        padding: 20,
    },
});
export default RegisterScreen;
