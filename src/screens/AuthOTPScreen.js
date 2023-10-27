import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
    Pressable,
    StatusBar,
} from 'react-native';
import React, { useRef } from 'react';
import { HeaderImage, Images, Fonts, Colors } from '../constants';
import OTPTextInput from 'react-native-otp-textinput';

const AuthOTPScreen = () => {
    let otpInput = useRef(null);
    const setText = () => {
        otpInput.current.setValue('123456');
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
                <Pressable>
                    <Image
                        style={{ margin: 10 }}
                        source={HeaderImage[0].image}
                    />
                </Pressable>
                <Text style={styles.textTitle}>Xác minh OTP</Text>
                <Text style={styles.txtTileAttension}>
                    Nhập mã OTP vừa được gửi về email của bạn
                </Text>
                <View style={styles.formOTPAuth}>
                    <OTPTextInput
                        inputCount={6}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            padding: 20,
                        }}
                        textInputStyle={{
                            borderRadius: 5,
                            backgroundColor: Colors.DEFAULT_WHITE,
                        }}
                        tintColor={Colors.DEFAULT_WHITE}
                    />
                    <Pressable style={styles.buttonRegister}>
                        <Text
                            style={{
                                color: Colors.DEFAULT_WHITE,
                                fontSize: 18,
                                fontFamily: Fonts.Regular,
                            }}
                        >
                            Đăng ký
                        </Text>
                    </Pressable>
                    <Text
                        style={{
                            color: Colors.DEFAULT_WHITE,
                            marginTop: 20,
                            fontFamily: Fonts.Light,
                        }}
                    >
                        Bạn chưa nhận được mã?{' '}
                        <Text style={{ color: Colors.DEFAULT_ORANGE }}>
                            Gửi lại mã
                        </Text>
                    </Text>
                </View>
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
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        paddingTop: 40,
        fontFamily: Fonts.Bold,
    },
    txtTileAttension: {
        color: Colors.LIGHT_GRAY,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: Fonts.Light,
    },
    formOTPAuth: {
        marginTop: 100,
        alignItems: 'center',
    },
    buttonRegister: {
        backgroundColor: Colors.DARK_RED,
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
    },
});
