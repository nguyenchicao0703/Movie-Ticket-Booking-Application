import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, InformationBottom } from '../components';
import ComboList from '../components/list/ComboList';
import { Colors } from '../constants';
import comboAPI from '../api/comboAPI';
import { useSelector } from 'react-redux';
import { informationShowtimesSelector } from '../redux/selectors';

const ComboScreen = ({ navigation }) => {
    const [data, setData] = useState();
    const dataInfomationShowtimes = useSelector(informationShowtimesSelector);
    console.log({ dataInfomationShowtimes });

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
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await comboAPI.getAll();
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Combo bắp & nước'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ComboList data={data} />
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
