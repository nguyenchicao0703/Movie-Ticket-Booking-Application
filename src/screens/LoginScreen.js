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
    ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, Images, LineBill } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthAccountButton, BackButton, Input, TextTitle } from '../components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    fetchUsersMail,
    resetUsers,
    setUsers,
} from '../redux/slice/usersSlice';
import { usersSelector } from '../redux/selectors';
import { da, tr } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
const Line = () => {
    return (
        <View
            style={{
                width: '95%',
                height: 1,
                backgroundColor: Colors.LIGHT_GRAY,
                alignSelf: 'center',
                marginTop: 1,
                opacity: 0.35,
                flex: 1,
            }}
        />
    );
};
const LoginScreen = () => {
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingWaite, setIsLoadingWaite] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalTimer, setModalTimer] = useState(null);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const [error, setError] = useState('');
    const clearState = () => {
        setUserName('');
        setShowModal(false);
        setModalTimer(null);
        setPhone('');
        setError('');
        setPassword('');
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const response = useSelector(usersSelector);
    // Login with Phone Number
    console.log(phone, 'và', password);
    const handlePhoneChange = (text) => {
        setPhone(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const loginWithPhoneNumber = async () => {
        // await AsyncStorage.removeItem('user');

        if (phone.trim() === '') {
            setError('Số điện thoại bị để trống!');
            return;
        }
        if (!phone.startsWith('0')) {
            setError('Số điện thoại phải bắt đầu bằng 0.');
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
        // if (password.length > 12 || password.length < 8) {
        //     setError('Mật khẩu phải dài từ 8-12 ký tự');
        //     return;
        // }
        try {
            const response = await dispatch(fetchUsers({ phone, password }));
            // console.log(response);
            const status = response.payload.status;
            const msg = response.payload.msg;
            //handle the API response
            if (status) {
                //login successfuly
                setIsLoading(true);

                ToastAndroid.show('đăng nhập thành công', ToastAndroid.LONG);
                clearState();
                setIsLoggedIn(true);
                console.log(response.payload);
                await AsyncStorage.setItem(
                    'user',
                    JSON.stringify(response.payload),
                );
                setTimeout(() => {
                    setIsLoading(false);
                    navigation.navigate('Drawer');
                }, 1000);
            } else {
                // Failed login
                setError('Sai mật khẩu hoặc số điện thoại chưa được đăng ký!');
                console.log('Login failed', msg);

                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);

            console.log('error logging in', error);
            setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        }
    };

    const handleLoginWithPhoneNum = () => {
        loginWithPhoneNumber(phone, password);
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
            const response = await dispatch(fetchUsersMail(email));
            console.log(response);
            if (response.payload.status) {
                if (response.payload.data) {
                    setIsLoading(true);
                    console.log('Logged in successfully');
                    await AsyncStorage.setItem(
                        'user',
                        JSON.stringify(response.payload),
                    );
                    console.log(response);
                    navigation.navigate('Drawer');
                    clearState();
                    setIsLoggedIn(true);
                    setIsLoading(false);
                } else if (response.payload.data === null) {
                    console.log('du lieu ', response.payload.data);
                    setShowModal(true);
                    setModalTimer(setTimeout(() => setShowModal(false), 3000));
                    setIsLoggedIn(true);
                    console.log(response.payload.msg);
                    // Close the modal after 3 seconds
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
            setIsLoadingWaite(true);
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);
            const { user } = await auth().signInWithCredential(
                googleCredential,
            );
            const email = user.email;
            clearState();
            setUserName(user.displayName);
            await handleLoginWithEmail(email);
            setIsLoadingWaite(false);
        } catch (error) {
            // Handle Google Sign-In
            setIsLoadingWaite(false);
            error;
            // Display appropriate error message to the user
            console.log('Google Sign-In error:', error.message);
        }
    };

    const clickRegister = () => {
        navigation.navigate('Register');
    };
    // useEffect(() => {
    //     if (response.users.data) {
    //         // Đăng nhập thành công
    //         console.log('Đăng nhập thành công:', response.users.data);
    //         navigation.navigate('Drawer');
    //         clearState();
    //         setIsLoggedIn(true);
    //     } else if (response.users.data === null) {
    //         // Đăng nhập thất bại

    //     }
    // }, [response.users]);

    const { width, height, scale, fontScale } = useWindowDimensions();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <Spinner
                visible={isLoading}
                textContent={'Đăng nhập thành công...'}
                textStyle={{ color: '#FFF' }}
                size={'slide'}
                color="#B73131"
                animation="fade"
                overlayColor="#1E1F27"
            />
            <Spinner
                visible={isLoadingWaite}
                textContent={'Đang tải...'}
                textStyle={{ color: '#FFF' }}
                size={'slide'}
                color="#B73131"
                animation="fade"
                overlayColor="#1E1F27"
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

                <BackButton onPress={() => navigation.goBack()} />
                <TextTitle text={'Đăng nhập'} />
                <View style={styles.container}>
                    <View style={styles.formLogin}>
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
                                onChangeText={handlePhoneChange}
                                value={phone}
                                keyboardType={'numeric'}
                            />
                            <View style={{ height: height * 0.02 }}></View>
                            <Input
                                style={{ width: '70%' }}
                                label={'Mật khẩu'}
                                onChangeText={handlePasswordChange}
                                value={password}
                                secureTextEntry={true}
                            />
                            {error !== '' && (
                                <Text style={styles.errorText}>{error}</Text>
                            )}
                        </View>

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <AuthAccountButton
                                onPress={handleLoginWithPhoneNum}
                                text={'Đăng nhập'}
                            />

                            <View
                                style={{ flexDirection: 'row', marginTop: 20 }}
                            >
                                <Line />
                                <Text
                                    style={[
                                        styles.textLine,
                                        { fontSize: height * 0.018, flex: 0.3 },
                                    ]}
                                >
                                    hoặc
                                </Text>
                                <Line />
                            </View>

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
                        </View>

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
