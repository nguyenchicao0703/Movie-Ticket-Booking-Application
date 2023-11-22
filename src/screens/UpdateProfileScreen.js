import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Pressable,
    useWindowDimensions,
    Modal,
    ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    Colors,
    Fonts,
    UpdateProfileImage,
    BottomTabImage,
    ModalRatingImage,
} from '../constants';
import { useNavigation } from '@react-navigation/native';
import { AuthAccountButton, Input, Header, InputAddress } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '../redux/selectors';
import {
    fetchUsers,
    fetchUsersMail,
    resetUsers,
} from '../redux/slice/usersSlice';
import usersAPI from '../api/usersAPI';

const UpdateProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { width, height } = useWindowDimensions();
    const dataUser = useSelector(usersSelector);
    console.log({ dataUser });
    const userProfile = dataUser.users.data;
    console.log({ userProfile });
    const id = userProfile.id_user;
    console.log('update name', name);
    console.log('name chet tiet', userProfile.name);

    const [name, setName] = useState(userProfile ? userProfile.name : '');
    const [phone, setPhone] = useState(userProfile ? userProfile.phone : '');
    const [email, setEmail] = useState(userProfile ? userProfile.email : '');
    const [avatar, setAvatar] = useState(userProfile ? userProfile.avatar : '');
    const [diachi, setDiachi] = useState(userProfile ? userProfile.diachi : '');
    const [tinh, setTinh] = useState(userProfile ? userProfile.tinh : '');
    const [quan, setQuan] = useState(userProfile ? userProfile.quan : '');
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setshowPicker] = useState(false);
    const [dayOfBirth, setDayOfBirth] = useState(
        userProfile ? userProfile.bod : '',
    );
    const [initialUser, setInitialUser] = useState(userProfile);
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        setInitialUser(userProfile);
    }, [dataUser]);

    const [gender, setGender] = useState(dataUser.users.data.gender);
    console.log({ gender });
    const fontSize = height * 0.018;
    //Day Of Birth
    const toggleDatepicker = () => {
        setshowPicker(!showPicker);
    };

    const handleChangeGender = (stringGender) => {
        setGender(stringGender);
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

        return `${year}-${month}-${day}`;
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
        // dispatch(resetUsers());
        // Dispatch action để xóa dữ liệu người dùng từ Redux
        // Đặt các trường nhập liệu khác về giá trị mặc định tương ứng
    };

    const handleGoBack = () => {
        setName(initialUser ? initialUser.name : '');
        setPhone(initialUser ? initialUser.phone : '');
        setEmail(initialUser ? initialUser.email : '');
        setAvatar(initialUser ? initialUser.avatar : '');
        setDiachi(initialUser ? initialUser.diachi : '');
        setTinh(initialUser ? initialUser.tinh : '');
        setQuan(initialUser ? initialUser.quan : '');
        setDayOfBirth(initialUser ? initialUser.bod : '');
        setGender(dataUser.users.data.gender);
        navigation.goBack();
    };
    const handleNameChange = (newName) => {
        setName(newName);
    };

    const handlePhoneChange = (newPhone) => {
        setPhone(newPhone);
    };
    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };
    const handleTinhChange = (newTinh) => {
        setTinh(newTinh);
    };
    const handleQuanChange = (newQuan) => {
        setQuan(newQuan);
    };
    const handleDiaChiChange = (newDiachi) => {
        setDiachi(newDiachi);
    };

    const handleUpdateProfile = async () => {
        // Kiểm tra xem các trường thông tin đã được điền đầy đủ chưa
        if (
            !name ||
            !phone ||
            !email ||
            !dayOfBirth ||
            !tinh ||
            !quan ||
            !diachi
        ) {
            // Xử lý lỗi nếu các trường thông tin bị thiếu
            console.log('ko được để trống thông tin');
            // Ví dụ: hiển thị thông báo lỗi cho người dùng
            return;
        }
        // Tạo một đối tượng mới chứa thông tin người dùng đã cập nhật
        const data = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            avatar: selectedImage, // Cập nhật avatar nếu người dùng đã chọn ảnh mới
            diachi: diachi,
            tinh: tinh,
            quan: quan,
            bod: dayOfBirth,
            gender: true,
        };
        // Gọi API để cập nhật thông tin người dùng
        try {
            console.log('gender aaa', gender);
            const response = await usersAPI.postUpdateProfile(data);
            console.log('response update profile', response);
            dispatch(fetchUsers(phone));
            return response;
        } catch (error) {
            console.log('Error fetching update profile', error);
        }
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
                                    : { uri: `${avatar}` }
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
                        <Input
                            value={name}
                            label={'Họ và tên'}
                            onChangeText={handleNameChange}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Input
                            keyboardType={'numeric'}
                            label={'Số điện thoại'}
                            value={phone}
                            onChangeText={handlePhoneChange}
                            editable={false}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Input
                            label={'Email'}
                            value={email}
                            onChangeText={handleEmailChange}
                        />
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

                    <View style={styles.containerInput}>
                        <InputAddress
                            style={{}}
                            label={'Tỉnh/Thành phố'}
                            value={tinh}
                            onChangeText={(text) => setTinh(text)}
                        />
                        <InputAddress
                            style={{}}
                            label={'Quận huyện'}
                            value={quan}
                            onChangeText={(text) => setQuan(text)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Input
                            label={'Địa chỉ'}
                            value={diachi}
                            onChangeText={(text) => setDiachi(text)}
                        />
                    </View>
                    <View style={[styles.gender]}>
                        <Text
                            style={[
                                styles.titleCheckbox,
                                { fontSize: fontSize },
                            ]}
                        >
                            Giới tính
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                }}
                            >
                                <Pressable
                                    onPress={() => handleChangeGender('1')}
                                    style={[
                                        styles.checkBoxCircle,
                                        {
                                            width: width * 0.06,
                                            height: height * 0.03,
                                        },
                                    ]}
                                >
                                    {gender === '1' ? (
                                        <View style={styles.inSideCircle} />
                                    ) : null}
                                </Pressable>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginLeft: 10,
                                        marginRight: 30,
                                        fontFamily: Fonts.Regular,
                                        fontSize: fontSize,
                                    }}
                                >
                                    Nam
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                }}
                            >
                                <Pressable
                                    onPress={() => handleChangeGender('0')}
                                    style={[
                                        styles.checkBoxCircle,
                                        {
                                            width: width * 0.06,
                                            height: height * 0.03,
                                        },
                                    ]}
                                >
                                    {gender === '0' ? (
                                        <View style={styles.inSideCircle} />
                                    ) : null}
                                </Pressable>
                                <Text
                                    style={{
                                        color: 'white',
                                        marginLeft: 10,
                                        marginRight: 30,
                                        fontFamily: Fonts.Regular,
                                        fontSize: fontSize,
                                    }}
                                >
                                    Nữ
                                </Text>
                            </View>
                        </View>
                    </View>
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
        width: '100%',
        justifyContent: 'space-between',
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
    gender: {
        width: '100%',
        marginTop: 15,
        marginLeft: 30,
    },
    titleCheckbox: {
        color: Colors.LIGHT_GRAY,
        fontFamily: Fonts.Light,
    },
    checkBoxCircle: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: Colors.DARK_RED,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inSideCircle: {
        width: '50%',
        height: '50%',
        backgroundColor: Colors.DARK_RED,
        borderRadius: 100,
    },
});
