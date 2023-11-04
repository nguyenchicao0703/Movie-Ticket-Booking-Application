import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    StatusBar,
    useWindowDimensions,
    Pressable,
    Image,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, Images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthAccountButton, BackButton, Input, TextTitle } from '../components';
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
const LoginScreen = ({ navigation }) => {
    const clickLogin = () => {
        navigation.navigate('AuthOTP');
    };

    const clickRegister = () => {
        navigation.navigate('Register');
    };

    const { width, height, scale, fontScale } = useWindowDimensions();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />

            <ImageBackground
                style={styles.backgroudImage}
                source={Images[4].image}
            >
                <BackButton />
                <TextTitle text={'Đăng nhập'} />
                <View style={styles.container}>
                    <View style={styles.formLogin}>
                        {/* <View style={{ flexDirection: 'row', width: '95%' }}>
                            <Input label={'Email'} />
                        </View> */}

                        {/* <AuthAccountButton
                            text="Đăng nhập"
                            onPress={clickLogin}
                        /> */}
                        <Pressable
                            style={{
                                backgroundColor: Colors.DEFAULT_WHITE,
                                width: '95%',
                                borderRadius: 20,
                                height: height * 0.06,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Image
                                source={require('../assets/Login/google.png')}
                            />
                            <Text
                                style={{
                                    color: Colors.DEFAULT_BLACK,
                                    fontSize: height * 0.02,
                                    fontFamily: Fonts.Medium,
                                    paddingLeft: 10,
                                }}
                            >
                                Sign in with Google
                            </Text>
                        </Pressable>

                        <View style={styles.groupLine}>
                            <View style={styles.line} />
                            <View>
                                <Text
                                    style={[
                                        styles.textLine,
                                        { fontSize: height * 0.015 },
                                    ]}
                                >
                                    hoặc
                                </Text>
                            </View>
                            <View style={styles.line} />
                        </View>

                        <Pressable
                            onPress={clickRegister}
                            style={[
                                styles.buttonRegister,
                                { height: height * 0.06 },
                            ]}
                        >
                            <Text
                                style={{
                                    color: Colors.LIGHT_GRAY,
                                    fontSize: height * 0.02,
                                    fontFamily: Fonts.Regular,
                                }}
                            >
                                Đăng kí tài khoản
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    formLogin: {
        alignItems: 'center',
        marginTop: 100,
    },
    textTitle: {
        fontSize: 30,
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.Medium,
        position: 'relative',
    },
    backgroudImage: {
        flex: 1,
    },
    line: {
        width: '40%',
        height: 2,
        backgroundColor: Colors.MEDIUM_GRAY_LINE,
        opacity: 0.5,
    },
    textLine: {
        textAlign: 'center',
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
        fontSize: 12,
        margin: 10,
    },
    groupLine: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginTop: 15,
    },
    buttonRegister: {
        backgroundColor: 'transparent',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 15,
    },
    container: {
        height: '80%',
        width: '100%',
        marginTop: 20,
    },
});
