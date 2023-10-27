import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    Pressable,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { HeaderImage, Images, Fonts, Colors } from '../constants';

const RegisterScreen = () => {
    const [unTickedMale, setUnTickedMale] = useState(true);
    const [unTickedFemale, setUnTickedFemale] = useState(true);

    const [unTickedOrther, setUnTickedOrther] = useState(true);
    const [unTickedRule, setUnTickedRule] = useState(true);

    return (
        <View>
            <StatusBar
                animated={true}
                StatusBar="light-content"
                backgroundColor={Colors.DEFAULT_BLACK}
            />
            <ImageBackground
                style={styles.backgroudImage}
                source={Images[4].image}
            >
                <Pressable>
                    <Image
                        style={{ margin: 10 }}
                        source={HeaderImage[0].image}
                    />
                </Pressable>
                <Text style={styles.textTitle}>Đăng ký</Text>

                <View style={styles.formRegister}>
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Họ và tên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập họ và tên..."
                            placeholderTextColor={Colors.LIGHT_GRAY}
                        ></TextInput>
                    </View>

                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại..."
                            placeholderTextColor={Colors.LIGHT_GRAY}
                        ></TextInput>
                    </View>

                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập email..."
                            placeholderTextColor={Colors.LIGHT_GRAY}
                        ></TextInput>
                    </View>

                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Ngày sinh</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập ngày sinh..."
                            placeholderTextColor={Colors.LIGHT_GRAY}
                        ></TextInput>
                    </View>
                </View>
                <Text style={styles.titleCheckbox}>Giới tính</Text>
                <View style={styles.groupCheckbox}>
                    <View style={styles.miniGroupCheckbox}>
                        {unTickedMale ? (
                            <TouchableOpacity
                                onPress={() => setUnTickedMale(!unTickedMale)}
                                style={styles.ButtonCheckBox}
                            >
                                <Text style={{ textAlign: 'center' }}>✓</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setUnTickedMale(!unTickedMale)}
                                style={styles.ButtonChecked}
                            ></TouchableOpacity>
                        )}
                        <Text style={styles.textCheckbox}>Nam</Text>
                    </View>

                    <View style={styles.miniGroupCheckbox}>
                        {unTickedFemale ? (
                            <TouchableOpacity
                                onPress={() =>
                                    setUnTickedFemale(!unTickedFemale)
                                }
                                style={styles.ButtonCheckBox}
                            >
                                <Text style={{ textAlign: 'center' }}>✓</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    setUnTickedFemale(!unTickedFemale)
                                }
                                style={styles.ButtonChecked}
                            ></TouchableOpacity>
                        )}
                        <Text style={styles.textCheckbox}>Nữ</Text>
                    </View>

                    <View style={styles.miniGroupCheckbox}>
                        {unTickedOrther ? (
                            <TouchableOpacity
                                onPress={() =>
                                    setUnTickedOrther(!unTickedOrther)
                                }
                                style={styles.ButtonCheckBox}
                            >
                                <Text style={{ textAlign: 'center' }}>✓</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() =>
                                    setUnTickedOrther(!unTickedOrther)
                                }
                                style={styles.ButtonChecked}
                            ></TouchableOpacity>
                        )}
                        <Text style={styles.textCheckbox}>Khác</Text>
                    </View>
                </View>

                <View style={styles.groupRule}>
                    {unTickedRule ? (
                        <TouchableOpacity
                            onPress={() => setUnTickedRule(!unTickedRule)}
                            style={styles.ButtonCheckBoxRule}
                        >
                            <Text style={{ textAlign: 'center' }}>✓</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setUnTickedRule(!unTickedRule)}
                            style={styles.ButtonCheckBoxRule}
                        ></TouchableOpacity>
                    )}
                    <Text style={styles.textRule}>
                        Khi đăng ký, tối đã xem xét và đồng ý với{' '}
                        <Text style={styles.textAttention}>
                            điều khoản sử dụng
                        </Text>{' '}
                        và{' '}
                        <Text style={styles.textAttention}>
                            {' '}
                            chính sách bảo mật
                        </Text>{' '}
                        của MTB Cinema.
                    </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Pressable style={styles.buttonRegister}>
                        <Text
                            style={{
                                color: Colors.DEFAULT_WHITE,
                                fontSize: 18,
                                fontFamily: Fonts.Regular,
                            }}
                        >
                            Đăng ký
                        </Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    backgroudImage: {
        width: '100%',
        height: '100%',
    },
    textTitle: {
        fontSize: 30,
        color: Colors.DEFAULT_WHITE,
        textAlign: 'center',
        paddingTop: 40,
        fontFamily: Fonts.Bold,
    },
    textEmail: {
        color: '#C1C1C1',
        paddingLeft: 10,
        zIndex: 3,
    },
    inputEmail: {
        width: '100%',
        height: 40,
        borderColor: 'white',
        backgroundColor: 'white',
        color: 'white',
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
    },
    formRegister: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    groupInput: {
        padding: 5,
        width: '90%',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginTop: 15,
    },
    text: {
        color: Colors.LIGHT_GRAY,
        paddingLeft: 10,
        zIndex: 3,
        fontFamily: Fonts.Light,
    },
    input: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 40,
        borderColor: Colors.DEFAULT_WHITE,
        color: Colors.DEFAULT_WHITE,
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
        fontFamily: Fonts.Regular,
    },
    groupCheckbox: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    ButtonCheckBox: {
        backgroundColor: 'transparent',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: Colors.DARK_RED,
        borderWidth: 2,
    },
    ButtonChecked: {
        backgroundColor: Colors.DARK_RED,
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: Colors.DEFAULT_WHITE,
        borderWidth: 2,
    },
    miniGroupCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        padding: 10,
    },
    textCheckbox: {
        color: Colors.DEFAULT_WHITE,
        paddingLeft: 10,
        fontFamily: Fonts.Regular,
    },
    titleCheckbox: {
        color: Colors.LIGHT_GRAY,
        paddingLeft: 36,
        marginTop: 10,
        fontFamily: Fonts.Light,
    },
    buttonRegister: {
        backgroundColor: Colors.DARK_RED,
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 20,
        marginTop: 20,
    },
    ButtonCheckBoxRule: {
        backgroundColor: Colors.DEFAULT_WHITE,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    groupRule: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 41,
    },
    textAttention: {
        color: Colors.DARK_RED,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.DARK_RED,
        fontFamily: Fonts.Regular,
    },
    textRule: {
        color: Colors.DEFAULT_WHITE,
        paddingLeft: 10,
        fontFamily: Fonts.Regular,
    },
});
