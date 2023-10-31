import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    Pressable,
} from 'react-native';
import React from 'react';
import { Header } from '../components';
import {
    Colors,
    DetailMovieImage,
    Fonts,
    HomeImage,
    Images,
} from '../constants';
import { ScrollView } from 'react-native-virtualized-view';

const DetailScreen = () => {
    const { height, width, scale, fontScale } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <Header titleHeader={'Phim'} />
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.groupPlayMovie}>
                    <Image
                        style={{ position: 'absolute', zIndex: 2 }}
                        source={DetailMovieImage[0].image}
                    />
                    <Image
                        style={{ width: width * 1, height: height * 0.28 }}
                        source={DetailMovieImage[2].image}
                    />
                </View>

                <View style={styles.groupRate}>
                    <Image
                        style={{
                            width: width * 0.064,
                            height: height * 0.032,
                        }}
                        source={DetailMovieImage[1].image}
                    />
                    <Text
                        style={{
                            color: Colors.DEFAULT_WHITE,
                            fontFamily: Fonts.Light,
                            marginLeft: 15,
                            fontSize: fontScale * 14,
                        }}
                    >
                        4.9/5
                    </Text>
                </View>

                <View style={styles.titleMovieName}>
                    <Image source={Images[3].image} />
                    <Text
                        style={{
                            fontSize: fontScale * 18,
                            textTransform: 'uppercase',
                            color: Colors.DEFAULT_WHITE,
                            fontFamily: Fonts.SemiBold,
                            marginLeft: 15,
                        }}
                    >
                        Spider-man No Way home
                    </Text>
                </View>

                <View style={styles.groupMovie}>
                    <Image
                        style={{ width: width * 0.26, height: height * 0.23 }}
                        source={DetailMovieImage[3].image}
                    />
                    <View style={styles.grouptextDetail}>
                        <Text style={styles.textDetail}>
                            Thời lượng: 120 phút
                        </Text>
                        <Text style={styles.textDetail}>
                            Khởi chiếu: 15/08/2023
                        </Text>
                        <Text style={styles.textDetail}>
                            Thể loại: Adventure/Superhero
                        </Text>
                        <Text style={styles.textDetail}>
                            Đạo diễn: Jon Watts
                        </Text>
                        <Text style={styles.textDetail}>
                            Diễn viên: Tom Holland, Zendaya, Jacob Batalon,
                            Cumberbatch, Marisa Tomei, Benedict...
                        </Text>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 17,
                        fontFamily: Fonts.SemiBold,
                        color: Colors.DEFAULT_WHITE,
                        marginTop: 10,
                        marginLeft: 10,
                    }}
                >
                    Tóm tắt phim
                </Text>
                <View style={styles.contentDetailMovie}>
                    <Text
                        style={{
                            fontSize: fontScale * 14,
                            color: Colors.LIGHT_GRAY,
                            fontFamily: Fonts.Light,
                        }}
                    >
                        “Spider-Man: No Way Home" (2021) kể về Peter
                        Parker/Spider-Man khi anh phải đối mặt với việc tiết lộ
                        danh tính và hậu quả không mong muốn. Anh tìm sự giúp đỡ
                        từ Stephen Strange/Doctor Strange để khắc phục tình
                        huống. Tuy nhiên, khi phép thuật được thực hiện, các
                        Spider-Man từ các vũ trụ khác xuất hiện. Peter cố gắng
                        đưa họ trở về và giải quyết hậu quả. Bộ phim mang đến
                        nhiều hành động và sự xuất hiện bất ngờ.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.boxButton}>
                <Pressable
                    style={[
                        styles.button,
                        { flex: 1, backgroundColor: Colors.DEFAULT_WHITE },
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            { color: Colors.DEFAULT_BLACK },
                        ]}
                    >
                        Đánh giá
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        { flex: 1, backgroundColor: Colors.DARK_RED },
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            { color: Colors.DEFAULT_WHITE },
                        ]}
                    >
                        Đặt vé
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DARK_BG,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    groupPlayMovie: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
    },
    groupRate: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    titleMovieName: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    groupMovie: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
    },
    textDetail: {
        fontSize: 15,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        padding: 3,
    },
    grouptextDetail: {
        paddingLeft: 5,
        width: '75%',
    },
    contentDetailMovie: {
        padding: 5,
        alignItems: 'center',
        width: '100%',
    },
    boxButton: {
        backgroundColor: 'transparent',
        height: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 30,
        borderColor: 'red',
        alignItems: 'center',
        height: '90%',
        justifyContent: 'center',
        margin: 5,
    },
    textButton: {
        fontFamily: Fonts.Medium,
    },
});
