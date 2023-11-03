import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, InformationBottom } from '../components';
import ComboList from '../components/list/ComboList';
import { Colors, SelectCombo } from '../constants';

const ComboScreen = ({ navigation }) => {
    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const navigationComboToPayment = () => {
        navigation.navigate('Payment');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Combo bắp  & nước'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ComboList data={SelectCombo} />
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
