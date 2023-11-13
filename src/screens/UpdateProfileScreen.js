import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Pressable,
    useWindowDimensions,
    Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    Colors,
    DrawerImage,
    Fonts,
    UpdateProfileImage,
    BottomTabImage,
    ModalRatingImage,
} from '../constants';
import { useNavigation } from '@react-navigation/native';
import {
    AuthAccountButton,
    GenderSelectionBox,
    Input,
    Header,
} from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';

const UpdateProfileScreen = () => {
    const navigation = useNavigation();
    const responseUser = useSelector(usersSelector);
    const { width, height } = useWindowDimensions();
    const [date, setDate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState('');
    const toggleDatepicker = () => {
        setshowPicker(!showPicker);
    };
    const data = responseUser.users.data;
    console.log(data);
    const [first, setfirst] = useState();
    // console.log(responseUser);
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = data.bod;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDayOfBirth(formatDate(currentDate));
            }
        } else {
            toggleDatepicker();
        }
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}-${month}-${year}`;
    };

    const [selectImage, setSelectImage] = useState('');
    const ImagePicker = () => {
        let options = {
            storageOptions: {
                path: 'image',
            },
        };

        launchImageLibrary(options, (reponse) => {
            setSelectImage();
            console.log(reponse);
        });
    };
    const LaunchCamera = () => {
        let options = {
            storageOptions: {
                path: 'image',
            },
        };
        launchCamera(options, (reponse) => {
            setSelectImage;
            console.log(reponse);
        });
    };
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: Colors.DARK_BG,
                alignItems: 'center',
            }}
        >
            <Header
                titleHeader={'Thông tin cá nhân'}
                onButtonBack={() => navigation.goBack()}
            />

            <View style={styles.groupAvatar}>
                <Modal transparent={true} visible={modalVisible}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { height: '30%' }]}>
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
                                Cập nhật avatar
                            </Text>
                            <Pressable
                                style={[
                                    styles.button,
                                    { width: '80%', height: height * 0.06 },
                                ]}
                                onPress={() => ImagePicker()}
                            >
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { fontSize: height * 0.02 },
                                    ]}
                                >
                                    Chọn ảnh từ thư viện
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.button,
                                    {
                                        width: '80%',
                                        height: height * 0.06,
                                        margin: 10,
                                    },
                                ]}
                                onPress={() => LaunchCamera()}
                            >
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { fontSize: height * 0.02 },
                                    ]}
                                >
                                    Chụp từ camera
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <View style={styles.avatar}>
                    <Image
                        style={{
                            width: width * 0.32,
                            height: height * 0.16,
                            borderRadius: 500,
                        }}
                        source={DrawerImage[5].image}
                    />
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Image
                            style={{
                                marginLeft: -15,
                                width: width * 0.06,
                                height: height * 0.026,
                            }}
                            source={UpdateProfileImage[0].image}
                        />
                    </Pressable>
                </View>

                <Text
                    style={{
                        color: Colors.DEFAULT_WHITE,
                        marginLeft: -10,
                        fontSize: height * 0.026,
                        fontFamily: Fonts.Medium,
                        marginTop: 15,
                    }}
                >
                    {data.name}
                </Text>
            </View>

            <View style={styles.groupInput}>
                <View style={styles.containerInput}>
                    <Input label={'Họ và tên'} value={data.name} onChangeText />
                </View>
                <View style={styles.containerInput}>
                    <Input
                        keyboardType={'numeric'}
                        label={'Số điện thoại'}
                        value={data.phone}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Input label={'Email'} />
                </View>
                <View style={styles.containerInput}>
                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}
                        />
                    )}
                    {!showPicker && (
                        <Pressable
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                color: Colors.DEFAULT_WHITE,
                                justifyContent: 'flex-end',
                            }}
                            onPress={toggleDatepicker}
                        >
                            <Input
                                value={dayOfBirth}
                                editable={false}
                                onChangeText={setDayOfBirth}
                                label={'Ngày sinh'}
                            />
                            <Image
                                style={{
                                    position: 'absolute',
                                    width: width * 0.05,
                                    right: 15,
                                }}
                                source={BottomTabImage[6].image}
                            />
                        </Pressable>
                    )}
                </View>
                <GenderSelectionBox marginLeft={30} />
                <AuthAccountButton text={'Cập nhật'} />
            </View>
        </View>
    );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
    groupAvatar: {
        width: '100%',
        alignItems: 'center',
    },
    avatar: {
        alignItems: 'center',
        marginTop: 15,
        flexDirection: 'row',
    },
    containerInput: {
        marginTop: 19,
        flexDirection: 'row',
    },
    groupInput: {
        width: '95%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        height: '30%',
        width: '90%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: Colors.DARK_RED,
        width: '70%',
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
        fontFamily: Fonts.Medium,
        marginTop: -20,
    },
});
