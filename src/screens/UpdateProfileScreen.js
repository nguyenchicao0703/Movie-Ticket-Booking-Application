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
import { ScrollView } from 'react-native-virtualized-view';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';
import { resetUsers } from '../redux/slice/usersSlice';

const UpdateProfileScreen = () => {
    const dataUser = useSelector(usersSelector);
    const userProfile = dataUser.users.data;
    const dispatch = useDispatch();
    const [name, setName] = useState(userProfile ? userProfile.name : '');
    const [phone, setPhone] = useState(userProfile ? userProfile.phone : '');
    const [email, setEmail] = useState(userProfile ? userProfile.email : '');
    const [avatar, setAvatar] = useState(userProfile ? userProfile.avatar : '');
    const [diachi, setDiachi] = useState(
        userProfile
            ? `${userProfile.diachi}  ${userProfile.quan}  ${userProfile.tinh}`
            : '',
    );
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { width, height } = useWindowDimensions();
    const [date, setDate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState(
        userProfile ? userProfile.bod : '',
    );
    //Day Of Birth
    const toggleDatepicker = () => {
        setshowPicker(!showPicker);
    };

    const onChangeDateOfBirth = ({ type }, selectedDate) => {
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

    //Handle Avatar User
    const [selectedImage, setSelectedImage] = useState(
        userProfile ? avatar : null,
    );
    const ImagePicker = () => {
        let options = {
            storageOptions: {
                path: 'image',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response && response.assets && response.assets.length > 0) {
                const selectedUri = response.assets[0].uri;
                setSelectedImage(selectedUri);

                console.log(selectedUri);
            }
        });
    };
    const LaunchCamera = () => {
        let options = {
            storageOptions: {
                path: 'image',
            },
        };
        launchCamera(options, (response) => {
            if (response && response.assets && response.assets.length > 0) {
                const selectedUri = response.assets[0].uri;
                setSelectedImage(selectedUri);
                console.log(selectedUri);
            }
        });
    };
    const clearInputFields = () => {
        dispatch(resetUsers());
        // Dispatch action để xóa dữ liệu người dùng từ Redux
        // Đặt các trường nhập liệu khác về giá trị mặc định tương ứng
    };

    const handleUpdateProfile = () => {};
    const handleGoBack = () => {
        // dispatch(resetUsers());
        navigation.goBack();
    };
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
                onButtonBack={() => handleGoBack()}
            />
            <ScrollView style={{ width: '100%' }}>
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
                            source={
                                selectedImage
                                    ? { uri: selectedImage }
                                    : { uri: `${userProfile.avatar}` }
                            }
                        />
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
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
                        {name}
                    </Text>
                </View>

                <View style={styles.groupInput}>
                    <View style={styles.containerInput}>
                        <Input value={name} label={'Họ và tên'} />
                    </View>
                    <View style={styles.containerInput}>
                        <Input
                            keyboardType={'numeric'}
                            label={'Số điện thoại'}
                            value={phone}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Input label={'Email'} value={email} />
                    </View>
                    <View style={styles.containerInput}>
                        <Input label={'Địa chỉ'} value={diachi} />
                    </View>
                    <View style={styles.containerInput}>
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChangeDateOfBirth}
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
                    <AuthAccountButton
                        text={'Cập nhật'}
                        onPress={handleUpdateProfile}
                    />
                </View>
            </ScrollView>
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
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
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
