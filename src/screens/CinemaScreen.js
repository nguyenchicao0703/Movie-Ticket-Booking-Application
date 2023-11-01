import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { CinemaList, Header } from '../components';
import { Colors, Fonts } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import Cinemas from '../constants/Cinemas';

const CinemaScreen = ({ navigation }) => {
    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    return (
        <View style={styles.container}>
            <Header
                titleHeader={'Chọn rạp'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <ScrollView>
                <View style={styles.tabBottomText}>
                    <Text style={styles.text}>GỢI Ý CHO BẠN</Text>
                </View>
                <CinemaList data={Cinemas} />
                <View style={styles.tabBottomText}>
                    <Text style={styles.text}>KHU VỰC TP.HCM</Text>
                </View>
                <CinemaList data={Cinemas} />
            </ScrollView>
        </View>
    );
};

export default CinemaScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DARK_BG,
        width: '100%',
        height: '100%',
    },
    tabBottomText: {
        backgroundColor: Colors.DARK_INDIGO,
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        padding: 8,
    },
    text: {
        fontSize: 18,
        fontFamily: Fonts.SemiBold,
        color: Colors.LIGHT_GRAY,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});
