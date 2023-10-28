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
import { TextInput } from 'react-native-paper';
const LoginScreen = ({ navigation }) => {
    const clickLogin = () => {
        navigation.navigate('AuthOTP');
    };
    const clickRegister = () => {
        navigation.navigate('Register');
    };

    const { width, height, scale, fontScale } = useWindowDimensions();
    return (
        <SafeAreaView style={{ flex: 1, minHeight: '100%', minWidth: '100%' }}>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <ImageBackground
                style={styles.backgroudImage}
                source={Images[4].image}
            >
                <View style={styles.child} />
                <Pressable>
                    <Image
                        style={{ margin: 10 }}
                        source={HeaderImage[0].image}
                    />
                </Pressable>
                <Text style={styles.textTitle}>Đăng nhập</Text>

                <View style={styles.formLogin}>
                    <View style={styles.groupEmailInput}>
                        <TextInput
                            style={{
                                backgroundColor: 'transparent',
                                fontFamily: Fonts.Regular,
                            }}
                            label={'Email'}
                            underlineColor="white"
                            activeUnderlineColor="white"
                            underlineStyle={{ borderColor: 'white' }}
                            cursorColor={Colors.DARK_RED}
                            keyboardType="text"
                            textColor={Colors.DEFAULT_WHITE}
                        ></TextInput>
                    </View>
                    <Pressable onPress={clickLogin} style={styles.buttonLogin}>
                        <Text
                            style={{
                                color: Colors.DEFAULT_WHITE,
                                fontFamily: Fonts.Regular,
                                fontSize: 18,
                            }}
                        >
                            Đăng nhập
                        </Text>
                    </Pressable>
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
        paddingTop: 40,
        fontFamily: Fonts.Bold,
    },
    backgroudImage: {
        width: '100%',
        height: '100%',
    },
    inputEmail: {
        backgroundColor: Colors.DEFAULT_WHITE,
        width: '100%',
        height: 40,
        borderColor: Colors.DEFAULT_WHITE,
        backgroundColor: Colors.DEFAULT_BLACK,
        color: Colors.DEFAULT_WHITE,
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
        fontFamily: Fonts.Regular,
    },
    groupEmailInput: {
        width: '90%',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.DEFAULT_WHITE,
        backgroundColor: Colors.DEFAULT_BLACK,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    buttonLogin: {
        backgroundColor: Colors.DARK_RED,
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 35,
    },
    line: { flex: 1, height: 0.6, backgroundColor: Colors.DEFAULT_WHITE },
    textLine: {
        width: 50,
        textAlign: 'center',
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
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
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.DEFAULT_WHITE,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20,
    },
});
