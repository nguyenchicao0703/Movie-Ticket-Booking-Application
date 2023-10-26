import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput,
    TextInputAndroidProps,
    Button,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { HeaderImage } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components';

const Login = () => {
    return (
        // <View style={styles.container}>
        //     {/* Emty Backgroud */}
        //     <View style={styles.emtyBackgroud}/>
        //     {/* Logo Image */}
        //     <Image style={styles.logoImage} source={require('../assets/Welcome/Logo.png')} />
        //     {/* darken the image */}
        //     <ImageBackground
        //         style={styles.loginImage}
        //         source={require('../assets/Welcome/login.png')}
        //     >
        //         <View style={styles.child} />
        //     </ImageBackground>

        // </View>
        <SafeAreaView style={{ flex: 1, minHeight: '100%', minWidth: '100%' }}>
            {/* Backgroud */}
            <ImageBackground
                style={styles.backgroudImage}
                source={require('../assets/Welcome/WelcomeScreen.png')}
            >
                <View style={styles.child} />
                <TouchableOpacity>
                    <Image
                        style={{ margin: 10 }}
                        source={HeaderImage[0].image}
                    />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Đăng nhập</Text>

                {/* FormLogin */}
                <View style={styles.formLogin}>
                    <View style={styles.groupEmailInput}>
                        <Text style={styles.textEmail}>Email</Text>
                        <TextInput style={styles.inputEmail}>
                            caogiathuan@gmail.com
                        </TextInput>
                    </View>
                    {/* Button Login */}
                    <TouchableOpacity style={styles.buttonLogin}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                    {/* Button */}
                    {/* Line */}
                    <View style={styles.groupLine}>
                        <View style={styles.line} />
                        <View>
                            <Text style={styles.textLine}>hoặc</Text>
                        </View>
                        <View style={styles.line} />
                    </View>
                    {/* Line */}
                    {/* Button Register */}
                    <TouchableOpacity style={styles.buttonRegister}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Đăng kí tài khoản
                        </Text>
                    </TouchableOpacity>
                    {/* Button */}
                </View>
                {/* FormLogin */}
            </ImageBackground>
            {/* imageHeader */}
        </SafeAreaView>
    );
};

export default Login;

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
        color: 'white',
        textAlign: 'center',
        paddingTop: 40,
    },
    backgroudImage: {
        width: '100%',
        height: '100%',
    },
    inputEmail: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderColor: 'white',
        backgroundColor: 'black',
        color: 'white',
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
    },
    groupEmailInput: {
        padding: 5,
        width: '90%',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black',
        borderRadius: 10,
    },
    buttonLogin: {
        backgroundColor: '#b73131',
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 35,
    },
    line: { flex: 1, height: 0.6, backgroundColor: 'white' },
    textLine: {
        width: 50,
        textAlign: 'center',
        color: '#C1C1C1',
    },
    groupLine: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginTop: 20,
    },
    textEmail: {
        color: '#C1C1C1',
        paddingLeft: 10,
        zIndex: 3,
    },
    buttonRegister: {
        backgroundColor: 'transparent',
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20,
    },
});
