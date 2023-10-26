import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useRef } from 'react';
import { HeaderImage } from '../constants';
import OTPTextInput from 'react-native-otp-textinput';

const AuthOTPScreen = () => {
    let otpInput = useRef(null);
    const setText = () => {
        otpInput.current.setValue('123456');
    };
    return (
        <View>
            <ImageBackground
                style={styles.backgroudImage}
                source={require('../assets/Welcome/WelcomeScreen.png')}
            >
                <TouchableOpacity>
                    <Image
                        style={{ margin: 10 }}
                        source={HeaderImage[0].image}
                    />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Xác minh OTP</Text>
                <Text style={styles.txtTileAttension}>
                    Nhập mã OTP vừa được gửi về email của bạn
                </Text>
                {/* FORM  */}

                <View style={styles.formOTPAuth}>
                    <OTPTextInput
                        inputCount={6}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            padding: 20,
                        }}
                        textInputStyle={{
                            borderRadius: 5,
                            backgroundColor: 'white',
                        }}
                        tintColor={'white'}
                    />
                    {/* BUTTON */}
                    <TouchableOpacity style={styles.buttonRegister}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                    {/* BUTTON */}
                    <Text style={{ color: 'white', marginTop: 20 }}>
                        Bạn chưa nhận được mã?{' '}
                        <Text style={{ color: '#FFD600' }}>Gửi lại mã</Text>
                    </Text>
                </View>
                {/* FORM */}
            </ImageBackground>
        </View>
    );
};

export default AuthOTPScreen;

const styles = StyleSheet.create({
    backgroudImage: {
        width: '100%',
        height: '100%',
    },
    textTitle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        paddingTop: 40,
        fontWeight: 'bold',
    },
    txtTileAttension: {
        color: '#C1c1c1',
        textAlign: 'center',
        marginTop: 10,
    },
    formOTPAuth: {
        marginTop: 100,
        alignItems: 'center',
    },
    buttonRegister: {
        backgroundColor: '#b73131',
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
});
