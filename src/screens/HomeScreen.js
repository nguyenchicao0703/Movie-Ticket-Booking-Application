import {
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { BottomTabImage, DrawerImage, HeaderImage, Movies } from '../constants';
import { Colors, Fonts } from '../constants/index';
import LinearGradient from 'react-native-linear-gradient';
import { MovieList } from '../components';

const bottomTabs = [
    { id: 1, image: 1, title: 'Phim', tab: 'Movie' },
    { id: 2, image: 0, title: 'Rạp', tab: 'Cinema' },
    { id: 3, image: 4, title: '', tab: 'Home' },
    { id: 4, image: 2, title: 'Vé', tab: 'Ticket' },
    { id: 5, image: 3, title: 'Quản lí', tab: 'Profile' },
];

const HomeScreen = ({ navigation }) => {
    const { width, height, scale, fontScale } = useWindowDimensions();
    const textTitle = fontScale * 22;

    const stackScreenBottom = (router) => {
        navigation.navigate(router);
    };

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: Colors.DARK_BG,
            }}
        >
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <ScrollView
                style={{
                    marginBottom: 100,
                }}
            >
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Image
                        style={{
                            width: 35,
                            height: 35,
                            marginLeft: 15,
                        }}
                        source={DrawerImage[5].image}
                    />
                    <View style={styles.headerRightView}>
                        <Image
                            style={[
                                styles.headerRight,
                                { width: 32, height: 22 },
                            ]}
                            source={HeaderImage[2].image}
                        />
                        <Image
                            style={[
                                styles.headerRight,
                                { marginLeft: 20, marginRight: 15 },
                            ]}
                            source={HeaderImage[1].image}
                        />
                    </View>
                </View>
                <Text
                    style={[
                        styles.title,
                        { marginTop: 21, fontSize: textTitle },
                    ]}
                >
                    Phim đang chiếu
                </Text>
                <MovieList data={Movies} />
                <Text
                    style={[
                        styles.title,
                        { marginTop: 23, fontSize: textTitle },
                    ]}
                >
                    Phim sắp chiếu
                </Text>
                <MovieList data={Movies} />
            </ScrollView>
            {/* bottom tab */}
            <LinearGradient
                colors={[Colors.DARK_RED, '#FF6666']}
                locations={[0.35, 1]}
                style={{
                    position: 'absolute',
                    backgroundColor: Colors.DARK_BG,
                    width: '95%',
                    height: height * 0.1 + 5,
                    bottom: height * 0.01,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderRadius: 10,
                    alignSelf: 'center',
                }}
            >
                {bottomTabs.map((value) => (
                    <Pressable
                        style={{
                            alignSelf: 'center',
                            marginTop: 5,
                        }}
                        onPress={() => stackScreenBottom(value.tab)}
                    >
                        <Image
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                                marginBottom: 7,
                            }}
                            source={BottomTabImage[value.image].image}
                        />
                        {value.id === 3 ? undefined : (
                            <Text
                                style={{
                                    color: Colors.DEFAULT_WHITE,
                                    fontSize: fontScale * 14,
                                    fontFamily: Fonts.Regular,
                                    textAlign: 'center',
                                }}
                            >
                                {value.title}
                            </Text>
                        )}
                    </Pressable>
                ))}
            </LinearGradient>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    headerRightView: {
        flexDirection: 'row',
    },
    headerRight: {
        alignSelf: 'center',
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
    },
    list: {
        marginTop: 8,
    },
});
