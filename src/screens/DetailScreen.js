import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    Pressable,
    Modal,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AuthAccountButton, Header, VideoView } from '../components';
import {
    Colors,
    DetailMovieImage,
    Fonts,
    Images,
    ModalRatingImage,
} from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import DropDownPicker from 'react-native-dropdown-picker';
import movieAPI from '../api/movieAPI';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { fetchMovies } from '../redux/slice/moviesSlice';
import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const DetailScreen = ({ navigation, route }) => {
    const fontSizeContent = height * 0.03;
    const [isLoading, setIsLoading] = useState(true);

    const videoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const { height, width, scale, fontScale } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(5);
    const [movie, setMovie] = useState(null);
    const [items, setItems] = useState([
        { label: '5 sao', value: 5 },
        { label: '4 sao', value: 4 },
        { label: '3 sao', value: 3 },
        { label: '2 sao', value: 2 },
        { label: '1 sao ', value: 1 },
    ]);
    const [ratingResult, setRatingResult] = useState(null);
    const idPhim = route.params.id;
    const idVe = Number(route.params.idTicket);
    const dispath = useDispatch();

    const [idMovie, setIdMovie] = useState(1);
    const [nameMovie, setNameMovie] = useState('');
    const roundedRating = Math.ceil(ratingResult);
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < roundedRating; i++) {
            stars.push(
                <Image
                    key={i}
                    style={{
                        width: width * 0.055,
                        height: height * 0.028,
                    }}
                    source={DetailMovieImage[1].image}
                />,
            );
        }
        return stars;
    };
    const handleOpenModal = () => {
        if (idVe) {
            setModalVisible(true);
            setIsVideoPlaying(false);
        } else {
            setModalVisible2(true);
        }
        // Khi mở modal, thiết lập modalVisible thành true và isVideoPlaying thành false
    };

    const handleCloseModal = () => {
        // Khi đóng modal, thiết lập modalVisible thành false và isVideoPlaying thành true
        setModalVisible(false);
        setModalVisible2(false);
        setIsVideoPlaying(true);
    };

    const handleButtonBack = () => {
        if (videoRef.current) {
            // Tạm dừng video
            if (videoRef.current.pause) {
                videoRef.current.pause();
            } else if (videoRef.current.pauseAsync) {
                videoRef.current.pauseAsync();
            }

            // Giải phóng tài nguyên video
            if (videoRef.current.release) {
                videoRef.current.release();
            } else if (videoRef.current.releaseAsync) {
                videoRef.current.releaseAsync();
            }
            navigation.goBack();
        } else {
            console.log(error);
        }
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const navigateDetailToCinema = () => {
        navigation.navigate('ShowtimeMovie', {
            idMovie,
            nameMovie,
        });
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true); // Bắt đầu tải dữ liệu
                const response = await movieAPI.getMovieDetails(idPhim);
                const data = response.data;
                setMovie(data);
                setIdMovie(data.id_phim);
                setNameMovie(data.ten_phim);
                setRatingResult(data.diemdanhgia);
                console.log('Data detail movie', data);
                setTimeout(() => {
                    setIsLoading(false); // Kết thúc tải dữ liệu
                });
            } catch (error) {
                console.log('Error fetching response Movie Detail:', error);
                setIsLoading(false); // Kết thúc tải dữ liệu
            }
        };

        fetchMovieDetails();
    }, [idPhim]);
    if (!movie) {
        return null; // or render a loading indicator
    }
    const handleRating = async () => {
        console.log({ value });
        console.log({ idVe });
        const data = {
            id_ve: parseInt(idVe),
            diem: value,
        };

        await movieAPI
            .postRating(data)
            .then((response) => {
                // Lấy dữ liệu điểm từ phản hồi
                // Lưu trữ giá trị điểm vào state
                console.log(response);
                const status = response.status;
                if (status) {
                    console.log('đánh giá thành công', response);
                    ToastAndroid.show(
                        'Đánh giá thành công',
                        ToastAndroid.SHORT,
                    );
                    handleCloseModal();
                } else {
                    console.log('đánh giá thất bại :', status);
                    ToastAndroid.show(
                        'Phim đã được đánh giá!',
                        ToastAndroid.SHORT,
                    );

                    handleCloseModal();
                }
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <Header
                titleHeader={'Phim'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <Spinner
                visible={isLoading}
                textContent={'Đang tải...'}
                textStyle={{ color: '#FFF' }}
                size={'slide'}
                color="#B73131"
                animation="fade"
                overlayColor="#1E1F27"
            />
            {movie && (
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.groupPlayMovie}>
                        <VideoPlayer
                            source={{
                                uri: `${movie.doangioithieu}`,
                            }}
                            style={styles.video}
                            resizeMode="cover"
                            ref={videoRef}
                            paused={isVideoPlaying}
                            disableBack={true}
                            fullscreen
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
                                    <Pressable onPress={handleCloseModal}>
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
                                    Đánh giá
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
                                    onPress={handleRating}
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

                    <Modal transparent={true} visible={modalVisible2}>
                        <View style={styles.centeredView}>
                            <View
                                style={[
                                    styles.modalView,
                                    { height: height * 0.25 },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.modalText,
                                        {
                                            fontSize: height * 0.024,
                                            marginTop: 19,
                                        },
                                    ]}
                                >
                                    Thông báo
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: Fonts.Light,
                                        fontSize: height * 0.018,
                                        color: Colors.DEFAULT_BLACK,
                                        textAlign: 'center',
                                        margin: 10,
                                    }}
                                >
                                    Bạn chưa thể bình luận! Hãy đặt vé xem phim
                                    & để lại cảm xúc của mình nhé
                                </Text>
                                <Pressable
                                    style={[
                                        styles.button,
                                        styles.buttonClose,
                                        {
                                            width: width * 0.51,
                                            height: height * 0.06,
                                        },
                                    ]}
                                    onPress={handleCloseModal}
                                >
                                    <Text
                                        style={[
                                            styles.textStyle,
                                            { fontSize: height * 0.018 },
                                        ]}
                                    >
                                        Xác nhận
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

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
                            <Text
                                style={[
                                    styles.textDetail,
                                    { fontSize: height * 0.02 },
                                ]}
                                numberOfLines={3}
                            >
                                Xếp hạng: {renderStars()}
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
                    onPress={handleOpenModal}
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
        height: 250,
    },

    image: {
        width: '100%',
        height: '72%',
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
        marginTop: 10,
    },
    groupMovie: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: Colors.OPACITY_MEDIUM_GRAY_LINE,
    },
    playIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 50,
        height: 50,
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
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    boxButton: {
        height: '6%',
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
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
