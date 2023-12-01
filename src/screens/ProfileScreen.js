import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { HeaderImage, Images, ProfileImage } from '../constants';
import { Colors, Fonts } from '../constants/index';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';
import { resetUsers } from '../redux/slice/usersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({}) => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '243901576266-jcuvlf63l60k3n7qhvdsi66icu86inuu.apps.googleusercontent.com',
        });
    }, []);
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
                await GoogleSignin.revokeAccess(); // Revoke Google access token
                await GoogleSignin.signOut(); // Sign out from Google
            }

            // Clear any relevant authentication state in your app
            setUserInfo(null);
            dispatch(resetUsers());
            console.log('Sign out');
            await AsyncStorage.removeItem('user');
            navigation.goBack();
        } catch (error) {
            console.log('Sign out error:', error.message);
        }
    };
    const { height, width, scale, fontScale } = useWindowDimensions();
    const navigation = useNavigation();

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };
    const stackScreen = (router) => {
        navigation.navigate(router);
    };
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: Colors.DARK_BG,
                justifyContent: 'space-between',
            }}
        >
            <View>
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 0.3,
                        paddingBottom: 15,
                        borderBottomColor: Colors.DARK_GRAY,
                        marginBottom: 15,
                    }}
                >
                    <Pressable
                        style={{ marginLeft: 15 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            style={{
                                width: 22,
                                height: 22,
                            }}
                            source={HeaderImage[0].image}
                        />
                    </Pressable>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Pressable
                            style={[
                                styles.headerRight,
                                { width: 32, height: 22 },
                            ]}
                            onPress={() => stackScreen('TicketHistory')}
                        >
                            <Image source={HeaderImage[2].image} />
                        </Pressable>
                        <Pressable
                            style={[
                                styles.headerRight,
                                { marginLeft: 20, marginRight: 15 },
                            ]}
                            onPress={handleButtonMenu}
                        >
                            <Image source={HeaderImage[1].image} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.body}>
                    <Pressable
                        onPress={() => navigation.navigate('UpdateProfile')}
                    >
                        <View style={styles.itemBorder}>
                            <View style={styles.bodyItem}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '80%',
                                    }}
                                >
                                    <Image
                                        source={ProfileImage[2].image}
                                        style={[styles.img]}
                                    />
                                    <Text
                                        style={[
                                            styles.txt,
                                            {
                                                fontSize: height * 0.018,
                                                width: '80%',
                                            },
                                        ]}
                                    >
                                        Thay đổi thông tin TV
                                    </Text>
                                </View>
                                <Image
                                    style={[styles.imgArrow]}
                                    source={Images[2].image}
                                />
                            </View>
                        </View>
                    </Pressable>

                    <View style={styles.itemBorder}>
                        <View style={styles.bodyItem}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={ProfileImage[0].image}
                                    style={styles.img}
                                />
                                <Text
                                    style={[
                                        styles.txt,
                                        {
                                            fontSize: height * 0.018,
                                            width: '80%',
                                        },
                                    ]}
                                >
                                    Xóa tài khoản
                                </Text>
                            </View>
                            <Image
                                style={[styles.imgArrow]}
                                source={Images[2].image}
                            />
                        </View>
                    </View>
                </View>
            </View>

            <Pressable onPress={() => handleSignOut()} style={styles.footer}>
                <Image source={ProfileImage[1].image} />
                <Text
                    style={[
                        {
                            fontFamily: Fonts.Light,
                            color: Colors.DARK_RED,
                            fontSize: fontScale * 24,
                            marginStart: 15,
                        },
                    ]}
                >
                    Thoát
                </Text>
            </Pressable>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    headerRight: {
        alignSelf: 'center',
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
    },
    body: {},
    itemBorder: {
        borderBottomColor: Colors.DARK_GRAY,
        borderBottomWidth: 0.3,
        marginStart: 0,
    },
    bodyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        justifyContent: 'space-between',
    },
    img: {
        width: 30,
        height: 30,
    },
    imgArrow: {
        alignItems: 'flex-end',
    },

    txt: {
        fontFamily: Fonts.Light,
        color: Colors.DEFAULT_WHITE,
        width: 176,
        alignItems: 'flex-start',
        marginStart: 15,
    },
    footer: {
        margin: '0%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
