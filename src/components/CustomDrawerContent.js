import {
    Text,
    Image,
    View,
    ImageBackground,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, DrawerImage, Fonts } from '../constants';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';

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
            }}
        />
    );
};

const Item = ({ imageIndex, title, navigation, router }) => {
    const { width, height, fontScale } = useWindowDimensions();

    return (
        <Pressable
            style={{
                flexDirection: 'row',
                marginHorizontal: width * 0.072,
                alignContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
            }}
            onPress={() => navigation.navigate(router)}
        >
            <Image
                source={DrawerImage[imageIndex].image}
                style={{ width: 35, height: 35 }}
            />
            <Text
                style={{
                    marginLeft: 18,
                    fontSize: fontScale * 16,
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.Regular,
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
};

const CustomDrawerContent = ({ navigation }) => {
    const { width, height, fontScale } = useWindowDimensions();
    const [nameUser, setNameUser] = useState('Nguyễn Văn A');
    const [avatar, setAvatar] = useState(
        'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
    );

    const dataUser = useSelector(usersSelector);
    useEffect(() => {
        setAvatar(
            dataUser.users.data
                ? dataUser.users.data.avatar
                : 'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
        );
        setNameUser(
            dataUser.users.data ? dataUser.users.data.name : 'Nguyen Van A',
        );
    }, [dataUser.users.data]);
    useEffect(() => {
        setAvatar(
            avatar.length !== 0
                ? avatar
                : 'https://tse4.mm.bing.net/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&pid=Api&P=0&h=220',
        );

        setNameUser(nameUser.length !== 0 ? nameUser : '');
    }, [avatar, nameUser]);

    return (
        <ImageBackground
            style={{ flex: 1, backgroundColor: Colors.DARK_DRAWER }}
            source={DrawerImage[0].image}
        >
            <Image
                source={{ uri: avatar }}
                style={{
                    alignSelf: 'center',
                    marginTop: height * 0.032,
                    width: width * 0.28,
                    height: width * 0.28,
                    borderRadius: 100,
                }}
            />
            <Text
                style={{
                    fontSize: fontScale * 20,
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.Bold,
                    textAlign: 'center',
                    marginRight: 7.33,
                    marginTop: 10,
                    marginBottom: 32,
                }}
            >
                {nameUser}
            </Text>
            <Line />
            <Item
                imageIndex={2}
                title={'Trang chủ'}
                navigation={navigation}
                router={'Home'}
            />
            <Line />
            <Item
                imageIndex={4}
                title={'Vé của tôi'}
                navigation={navigation}
                router={'Ticket'}
            />
            <Line />
            <Item
                imageIndex={1}
                title={'Đặt vé theo phim'}
                navigation={navigation}
                router={'Movie'}
            />
            <Line />
            <Item
                imageIndex={3}
                title={'Đặt vé theo rạp'}
                navigation={navigation}
                router={'Cinema'}
            />
            <Line />
        </ImageBackground>
    );
};

export default CustomDrawerContent;
