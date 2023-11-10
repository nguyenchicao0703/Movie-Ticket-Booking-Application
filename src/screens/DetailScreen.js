import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    Pressable,
    Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AuthAccountButton, Header } from '../components';
import {
    Colors,
    DetailMovieImage,
    Fonts,
    Images,
    ModalRatingImage,
} from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { Button } from 'react-native-paper';

const DetailScreen = ({ navigation, route }) => {
    const fontSizeContent = height * 0.03;

    const { height, width, scale, fontScale } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('ten');
    const [movie, setMovie] = useState(null);
    const [items, setItems] = useState([
        { label: '10', value: 'ten' },
        { label: '9', value: 'nine' },
        { label: '8', value: 'eight' },
        { label: '7', value: 'seven' },
        { label: '6', value: 'six' },
        { label: '5', value: 'five' },
        { label: '4', value: 'four' },
        { label: '3', value: 'three' },
        { label: '2', value: 'two' },
        { label: '1', value: 'one' },
    ]);

    const handleButtonBack = () => {
        navigation.goBack(null);
    };
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const navigateDetailToCinema = () => {
        navigation.navigate('ShowtimeMovie', {
            cinemaId: 1,
            cinemaTitle: 'spider-man no way home',
        });
    };
    const idPhim = route.params.id;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `http://10.0.2.2:1234/api/Chi-tiet-phim.php?id=${idPhim}`,
                );
                const data = response.data.data;
                setMovie(data);
                console.log(data);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchMovieDetails();
    }, [idPhim]);

    if (!movie) {
        return null; // or render a loading indicator
    }

    const hinhanh = movie.hinhanh;

    return (
        <View style={styles.container}>
            <Header
                titleHeader={'Phim'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            {movie && (
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.groupPlayMovie}>
                        <Image
                            style={{ width: width, height: height * 0.28 }}
                            source={DetailMovieImage[2].image}
                        />
                        <Image
                            style={{ position: 'absolute' }}
                            source={DetailMovieImage[0].image}
                        />
                    </View>

                    <Modal transparent={true} visible={modalVisible}>
                        <View style={styles.centeredView}>
                            <View
                                style={[
                                    styles.modalView,
                                    { height: height * 0.25 },
                                ]}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        width: '95%',
                                    }}
                                >
                                    <Pressable
                                        onPress={() =>
                                            setModalVisible(!modalVisible)
                                        }
                                    >
                                        <Image
                                            style={{
                                                width: width * 0.04,
                                                height: height * 0.02,
                                            }}
                                            source={ModalRatingImage[0].image}
                                        />
                                    </Pressable>
                                </View>
                                <Text
                                    style={[
                                        styles.modalText,
                                        { fontSize: height * 0.024 },
                                    ]}
                                >
                                    Đánh giá theo thang điểm 10
                                </Text>
                                <View style={{ width: '90%' }}>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        disabledStyle={{
                                            opacity: 0.5,
                                        }}
                                        mode="BADGE"
                                        placeholder="Chọn điểm"
                                        textStyle={{
                                            fontFamily: Fonts.Regular,
                                            fontSize: height * 0.018,
                                        }}
                                        labelStyle={{
                                            fontFamily: Fonts.Regular,
                                        }}
                                        style={{
                                            backgroundColor: Colors.LIGHT_GRAY,
                                            borderColor: 'transparent',
                                            width: width * 0.81,
                                            height: height * 0.07,
                                        }}
                                    />
                                </View>
                                <Pressable
                                    style={[
                                        styles.button,
                                        styles.buttonClose,
                                        {
                                            width: width * 0.51,
                                            height: height * 0.06,
                                        },
                                    ]}
                                    onPress={() => console.log(value)}
                                >
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { fontSize: height * 0.018 },
                                        ]}
                                    >
                                        Đánh giá
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Pressable onPress={() => setModalVisible(true)}>
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
                                    fontFamily: Fonts.Regular,
                                    marginLeft: 15,
                                    fontSize: height * 0.018,
                                    marginTop: 5,
                                }}
                            >
                                4.9/5
                            </Text>
                        </View>
                    </Pressable>

                    <View style={styles.titleMovieName}>
                        <Image
                            style={{
                                width: width * 0.08,
                                height: height * 0.04,
                            }}
                            source={Images[3].image}
                        />
                        <Text
                            style={{
                                fontSize: height * 0.023,
                                textTransform: 'uppercase',
                                color: Colors.DEFAULT_WHITE,
                                fontFamily: Fonts.SemiBold,
                                marginLeft: 15,
                            }}
                            numberOfLines={1}
                        >
                            {movie.ten_phim}
                        </Text>
                    </View>

                    <View style={styles.groupMovie}>
                        <Image
                            style={{
                                width: width * 0.26,
                                height: height * 0.23,
                                borderRadius: 5,
                            }}
                            source={{ uri: `${movie.hinhanh}` }}
                        />
                        <View style={styles.grouptextDetail}>
                            <Text
                                style={[
                                    styles.textDetail,
                                    { fontSize: height * 0.02 },
                                ]}
                            >
                                Thời lượng: {movie.thoiluong}
                            </Text>
                            <Text
                                style={[
                                    styles.textDetail,
                                    { fontSize: height * 0.02 },
                                ]}
                            >
                                Khởi chiếu: {movie.ngaykhoichieu}
                            </Text>
                            <Text
                                style={[
                                    styles.textDetail,
                                    { fontSize: height * 0.02 },
                                ]}
                            >
                                Thể loại: {movie.theloai}
                            </Text>
                            <Text
                                style={[
                                    styles.textDetail,
                                    { fontSize: height * 0.02 },
                                ]}
                            >
                                Đạo diễn: {movie.daodien.ten_daodien}
                            </Text>
                            <Text
                                style={[
                                    styles.textDetail,
                                    { fontSize: height * 0.02 },
                                ]}
                                numberOfLines={3}
                            >
                                Nhà sản xuất: {movie.nhasanxuat}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={{
                            fontSize: height * 0.024,
                            fontFamily: Fonts.Medium,
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
                                fontSize: height * 0.018,
                                color: Colors.LIGHT_GRAY,
                                fontFamily: Fonts.Light,
                                lineHeight: 25,
                                textAlign: 'justify',
                            }}
                        >
                            {movie.noidung}
                        </Text>
                    </View>
                </ScrollView>
            )}
            <View style={styles.boxButton}>
                <Pressable
                    style={[
                        styles.button1,
                        {
                            flex: 1,
                            backgroundColor: Colors.DEFAULT_WHITE,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            {
                                color: Colors.DEFAULT_BLACK,
                                fontSize: height * 0.02,
                            },
                        ]}
                    >
                        Đánh giá
                    </Text>
                </Pressable>
                <Pressable
                    onPress={navigateDetailToCinema}
                    style={[
                        styles.button1,
                        {
                            flex: 1,
                            backgroundColor: Colors.DARK_RED,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.textButton,
                            {
                                color: Colors.DEFAULT_WHITE,
                                fontSize: height * 0.02,
                            },
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
        margin: 10,
    },
    titleMovieName: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    groupMovie: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
    },
    textDetail: {
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.Light,
        marginBottom: 6,
        marginLeft: 3,
        fontSize: 15,
    },
    grouptextDetail: {
        marginLeft: 5,
        width: '75%',
    },
    contentDetailMovie: {
        paddingHorizontal: 15,
    },
    boxButton: {
        height: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
    },
    button1: {
        borderRadius: 30,
        borderColor: 'red',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    textButton: {
        fontFamily: Fonts.Medium,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',

        width: '90%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors.DARK_RED,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textStyle: {
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.Medium,
        fontSize: 15,
    },
    modalText: {
        textAlign: 'center',
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.SemiBold,
        marginTop: -20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: Colors.DARK_RED,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        fontFamily: Fonts.Medium,
        fontSize: 15,
    },
    modalText: {
        textAlign: 'center',
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.SemiBold,
        marginTop: -20,
    },
});
