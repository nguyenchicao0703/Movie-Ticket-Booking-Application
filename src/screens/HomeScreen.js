import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import { DrawerImage, HeaderImage, Movies } from '../constants';
import { Colors, Fonts } from '../constants/index';
import { MovieHomeItem } from '../components';

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <View style={styles.header}>
                <Image style={styles.avt} source={DrawerImage[5].image} />
                <View style={styles.headerRightView}>
                    <Image
                        style={styles.headerRight}
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
            <Text style={[styles.title, { marginTop: 21 }]}>
                Phim đang chiếu
            </Text>
            <FlatList
                style={styles.list}
                data={Movies}
                horizontal={true}
                extraData={(item) => item.id}
                renderItem={({ item }) => <MovieHomeItem data={item} />}
            />
            <Text style={[styles.title, { marginTop: 23 }]}>
                Phim sắp chiếu
            </Text>
            <FlatList
                style={styles.list}
                data={Movies}
                horizontal={true}
                extraData={(item) => item.id}
                renderItem={({ item }) => <MovieHomeItem data={item} />}
            />
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARK_BG,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    avt: {
        width: 35,
        height: 35,
        marginLeft: 15,
    },
    headerRightView: {
        flexDirection: 'row',
    },
    headerRight: {
        width: 32,
        height: 22,
        alignSelf: 'center',
    },
    title: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Medium,
        marginLeft: 15,
        fontSize: 22,
    },
    list: {
        marginTop: 8,
    },
});
