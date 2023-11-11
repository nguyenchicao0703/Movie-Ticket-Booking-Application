import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    StatusBar,
    useWindowDimensions,
    Pressable,
    Image,
    Modal,
    Alert,
    ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthAccountButton, BackButton, Input, TextTitle } from '../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import usersAPI from '../api/usersAPI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUsersMail } from '../redux/slice/usersSlice';
import { usersSelector } from '../redux/selector.js/usersSelector';
const LoginScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalTimer, setModalTimer] = useState(null);
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const response = useSelector(usersSelector);
    // console.log('selector user', response);
    // Login with Phone Number
    // console.log(response.users.status, response.users.msg, response);

    const loginWithPhoneNumber = async () => {
        dispatch(fetchUsers(phone));
        const status = response.users.status;
        const msg = response.users.msg;
        const data = response.users.data;
        try {
            //handle the API response
            if (status) {
                //login successfuly
                console.log('Đăng nhập thành công:', data);
                // navigation.navigate('Drawer');
                ToastAndroid.show('đăng nhập thành công', ToastAndroid.LONG);
            } else {
                //faile login
                if (String(phone).trim() === '') {
                    setError('Không được để trống số điện thoại.');
                    return;
                }
                if (!String(phone).startsWith('0')) {
                    setError('Số điện thoại phải bắt đầu bằng 0.');
                    return;
                }
                if (!status) {
                    setError('không tồn tại số điện thoại');

                    return;
                }
                console.log('Login faild', msg);
            }
        } catch (error) {
            console.log('error logging in', error);
        }
    };

    const handleLoginWithPhoneNum = () => {
        loginWithPhoneNumber(phone);
    };

    //Login with Google Email
    const handleModalClose = () => {
        setShowModal(false);
        clearTimeout(modalTimer);
        setUserName('');
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '243901576266-jcuvlf63l60k3n7qhvdsi66icu86inuu.apps.googleusercontent.com',
        });
    }, []);

    const handleLoginWithEmail = async (email) => {
        try {
            dispatch(fetchUsersMail(email));

            if (response) {
                if (response.users.status) {
                    if (response.users.data) {
                        const user = response.users.data;
                        console.log('Logged in successfully');
                        console.log(user);

                        // navigation.navigate('Drawer');
                    } else {
                        console.log('Please confirm email');
                        setShowModal(true);
                        setModalTimer(
                            setTimeout(() => setShowModal(false), 3000),
                        );
                        // Close the modal after 3 seconds
                    }
                }
            } else {
                console.log('An error occurred.');
            }
        } catch (error) {
            console.log('Error logging in with email:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            const { user } = await auth().signInWithCredential(
                googleCredential,
            );
            const email = user.email;
            setUserInfo(user);
            setUserName(user.displayName);
            await handleLoginWithEmail(email);
        } catch (error) {
            // Handle Google Sign-In error
            // Display appropriate error message to the user
            console.log('Google Sign-In error:', error.message);
        }
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
                {/* ...existing code... */}

                <Modal
                    visible={showModal}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={handleModalClose}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                <Text
                                    style={{
                                        color: Colors.DARK_RED,
                                        fontFamily: Fonts.SemiBold,
                                    }}
                                >
                                    {userName && `${userName}, `}
                                </Text>
                                Hãy xác nhận email của bạn trong{' '}
                                <Text style={{ color: Colors.DEFAULT_BLACK }}>
                                    60s
                                </Text>
                                .
                            </Text>
                        </View>
                    </View>
                </Modal>

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
                        <View
                            style={{
                                flexDirection: 'column',
                                width: '95%',
                                alignItems: 'center',
                            }}
                        >
                            <Input
                                style={{ width: '70%' }}
                                label={'Số điện thoại'}
                                onChangeText={(text) => setPhone(text)}
                                value={phone}
                                keyboardType={'numeric'}
                            />
                            {error !== '' && (
                                <Text style={styles.errorText}>{error}</Text>
                            )}
                        </View>
                        <AuthAccountButton
                            onPress={handleLoginWithPhoneNum}
                            text={'Đăng nhập'}
                        />
                        <Pressable
                            style={{
                                marginTop: 20,
                                backgroundColor: Colors.DEFAULT_WHITE,
                                width: '95%',
                                borderRadius: 20,
                                height: height * 0.06,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                            onPress={() => handleGoogleSignIn()}
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
                            <Text
                                style={[
                                    styles.textLine,
                                    { fontSize: height * 0.018 },
                                ]}
                            >
                                bạn chưa có tài khoản?{' '}
                            </Text>
                            <Pressable
                                onPress={clickRegister}
                                style={{
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={[
                                        styles.textLine,
                                        {
                                            fontSize: height * 0.018,
                                            color: Colors.LIGHT_RED,
                                        },
                                    ]}
                                >
                                    Đăng Ký
                                </Text>
                            </Pressable>
                        </View>
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
    },
    groupLine: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginTop: 15,
        justifyContent: 'center',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        textAlign: 'center',
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
