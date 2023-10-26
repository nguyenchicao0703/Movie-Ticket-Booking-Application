import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { Input } from '../components';
import { HeaderImage } from '../constants';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { Flag } from '@mui/icons-material';

const Register = () => {
    const [unTickedMale, setUnTickedMale] = useState(true);
    const [unTickedFemale, setUnTickedFemale] = useState(true);

    const [unTickedOrther, setUnTickedOrther] = useState(true);
    const [unTickedRule, setUnTickedRule] = useState(true);

    return (
        <View>
            <ImageBackground
                style={styles.backgroudImage}
                source={require('../assets/Welcome/WelcomeScreen.png')}
            >
                <TouchableOpacity>
                    <Image
                        style={{ margin: 10 }}
                        source={HeaderImage[0].image}
                    />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Đăng ký</Text>
                {/* FORM */}
                <View style={styles.formRegister}>
                    {/* Name */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Họ và tên</Text>
                        <TextInput style={styles.input}>
                            Cao Gia Thuận
                        </TextInput>
                    </View>
                    {/* Phone number */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Số điện thoại</Text>
                        <TextInput style={styles.input}>0339153975</TextInput>
                    </View>
                    {/* Email */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput style={styles.input}>
                            abcxzy@gmail.com
                        </TextInput>
                    </View>
                    {/* Day Of Birth */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Ngày sinh</Text>
                        <TextInput style={styles.input}>28/10/2001</TextInput>
                    </View>
                </View>
                <Text style={styles.titleCheckbox}>Giới tính</Text>
                <View style={styles.groupCheckbox}>
                    {/* Checkbox Male/Famle */}
                    {/* Male */}
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
                    {/* Female */}
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
                    {/* Orther */}
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
                {/* End CheckBox Gender*/}
                {/* tick rule */}
                <View style={styles.groupRule}>
                    {/* CheckBox Rule */}
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
                    {/* Button Register */}
                    <TouchableOpacity style={styles.buttonRegister}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                    {/* Button */}
                </View>

                {/* FORM */}
            </ImageBackground>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    backgroudImage: {
        width: '100%',
        height: '100%',
    },
    textTitle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        paddingTop: 40,
        fontWeight: 'bold',
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
        color: '#C1C1C1',
        paddingLeft: 10,
        zIndex: 3,
    },
    input: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 40,
        borderColor: 'white',
        color: 'white',
        zIndex: 2,
        borderRadius: 15,
        paddingLeft: 10,
        paddingTop: -10,
        fontSize: 17,
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
        borderColor: '#b73131',
        borderWidth: 2,
    },
    ButtonChecked: {
        backgroundColor: '#b73131',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
    },
    miniGroupCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        padding: 10,
    },
    textCheckbox: {
        color: '#fff',
        paddingLeft: 10,
    },
    titleCheckbox: {
        color: '#C1C1C1',
        paddingLeft: 36,
        marginTop: 10,
    },
    buttonRegister: {
        backgroundColor: '#b73131',
        width: '90%',
        maxHeight: 45,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 20,
        marginTop: 20,
    },
    ButtonCheckBoxRule: {
        backgroundColor: 'white',
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
        color: '#B73131',
        textDecorationLine: 'underline',
        textDecorationColor: '#B73131',
    },
    textRule: {
        color: 'white',
        paddingLeft: 10,
    },
});
