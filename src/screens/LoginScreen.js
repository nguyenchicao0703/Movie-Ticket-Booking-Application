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
import { Colors, Fonts, HeaderImage, Images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, Button, Input, TextTitle } from '../components';
const LoginScreen = ({ navigation }) => {
    const clickLogin = () => {
        navigation.navigate('AuthOTP');
        console.log('dc');
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

                        <Button text="Đăng nhập" onPress={clickLogin} />

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
                                    color: Colors.DEFAULT_WHITE,
                                    fontSize: 18,
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
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100,
    },
    imageHeader: {
        margin: 10,
    },
    textTitle: {
        fontSize: 30,
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.Bold,

        position: 'relative',
    },
    backgroudImage: {
        flex: 1,
    },

    line: { flex: 1, height: 0.6, backgroundColor: Colors.DEFAULT_WHITE },
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
    textEmail: {
        color: Colors.LIGHT_GRAY,
        paddingLeft: 10,
        zIndex: 3,
        fontFamily: Fonts.Light,
    },
    buttonRegister: {
        backgroundColor: 'transparent',
        width: '95%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.DEFAULT_WHITE,
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
