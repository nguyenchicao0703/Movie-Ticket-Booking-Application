import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, InformationBottom } from '../components';
import ComboList from '../components/list/ComboList';
import { Colors, SelectCombo } from '../constants';
import axiosClient from '../api/axiosClient';
import axios from 'axios';

const ComboScreen = ({ navigation }) => {
    const [data1, setData1] = useState();
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };
    const navigationComboToPayment = () => {
        navigation.navigate('Payment');
    };

    useEffect(() => {
        ComboRepon();
    }, []);

    const ComboRepon = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:1234/api/Danh-sach-combo.php',
                { timeout: 3000 },
            );
            setData1(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Combo bắp  & nước'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ComboList data={data1} />
            <InformationBottom
                nameMovie={'SIPDER-MAN NO WAY HOME'}
                seat={'E09, E10'}
                totalPayment={'220.000'}
                onPress={navigationComboToPayment}
            />
        </SafeAreaView>
    );
};

export default ComboScreen;
