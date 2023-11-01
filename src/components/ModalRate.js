import {
    StyleSheet,
    Text,
    View,
    Modal,
    useWindowDimensions,
    Pressable,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors, Fonts, ModalRatingImage } from '../constants';
import { DetailScreen } from '../screens';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const ModalRate = ({ visible, transparent }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { height, width, scale, fontScale } = useWindowDimensions();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('ten');
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
    return (
        <Modal
            transparent={transparent}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { height: height * 0.25 }]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '95%',
                        }}
                    >
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image source={ModalRatingImage[0].image} />
                        </Pressable>
                    </View>
                    <Text style={[styles.modalText, { fontSize: 18 }]}>
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
                            textStyle={{ fontFamily: Fonts.Regular }}
                            labelStyle={{ fontFamily: Fonts.Regular }}
                            style={{
                                backgroundColor: Colors.LIGHT_GRAY,
                                borderColor: 'transparent',
                            }}
                        />
                    </View>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => console.log(value)}
                    >
                        <Text style={styles.textStyle}>Đánh giá</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ModalRate;

const styles = StyleSheet.create({
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
