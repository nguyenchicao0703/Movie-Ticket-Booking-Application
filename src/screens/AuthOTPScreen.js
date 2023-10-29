import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    StatusBar,
} from 'react-native';
import React from 'react';
import { Images, Fonts, Colors } from '../constants';
import OTPTextInput from 'react-native-otp-textinput';
import { BackButton, Button, TextTitle } from '../components';

const AuthOTPScreen = ({ navigation }) => {
    const clickToHome = () => {
        navigation.navigate('Drawer');
    };
    const back = () => {
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
                <BackButton onPress={back} />
                <View>
                    <TextTitle text={'Xác minh OTP'} />
                    <Text style={styles.txtTileAttension}>
                        Nhập mã OTP vừa được gửi về email của bạn
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.formOTPAuth}>
                        <OTPTextInput
                            handleTextChange={(text) => console.log({ text })}
                            inputCount={6}
                            containerStyle={{
                                backgroundColor: 'transparent',
                                padding: 20,
                            }}
                            textInputStyle={{
                                borderRadius: 5,
                                backgroundColor: Colors.DEFAULT_WHITE,
                            }}
                            tintColor={Colors.LIGHT_GRAY}
                        />
                        <Button onPress={clickToHome} text={'Tiếp tục'} />
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
        fontFamily: Fonts.Bold,
    },
    txtTileAttension: {
        color: Colors.LIGHT_GRAY,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: Fonts.Light,
    },
    formOTPAuth: {
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
    container: {
        width: '100%',
        marginTop: 120,
    },
});
