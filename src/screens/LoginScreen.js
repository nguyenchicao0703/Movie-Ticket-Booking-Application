import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    StatusBar,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import React from 'react';
import { Colors, Fonts, Images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    AuthAccountButton,
    BackButton,
    Button,
    Input,
    TextTitle,
} from '../components';
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
                        <View style={{ flexDirection: 'row', width: '95%' }}>
                            <Input label={'Email'} />
                        </View>

                        <AuthAccountButton
                            text="Đăng nhập"
                            onPress={clickLogin}
                        />

                        <View style={styles.groupLine}>
                            <View style={styles.line} />
                            <View>
                                <Text style={styles.textLine}>hoặc</Text>
                            </View>
                            <View style={styles.line} />
                        </View>

                        <Pressable
                            onPress={clickRegister}
                            style={styles.buttonRegister}
                        >
                            <Text
                                style={{
                                    color: Colors.LIGHT_GRAY,
                                    fontSize: 16,
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
        height: 0.6,
        backgroundColor: Colors.MEDIUM_GRAY_LINE,
        opacity: 0.5,
    },
    textLine: {
        width: 50,
        textAlign: 'center',
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
        fontSize: 12,
    },
    groupLine: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginTop: 20,
    },
    buttonRegister: {
        backgroundColor: 'transparent',
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20,
    },
    container: {
        height: '80%',
        width: '100%',
        marginTop: 20,
    },
});
