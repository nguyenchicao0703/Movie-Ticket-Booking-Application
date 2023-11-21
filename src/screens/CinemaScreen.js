import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CinemaList, Header } from '../components';
import { Colors, Fonts } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import cinemaAPI from '../api/CinemaAPI';

const CinemaScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await cinemaAPI.getAll();
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Header
                titleHeader={'Chọn rạp'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            <View style={styles.tabBottomText}>
                <Text style={styles.text}>KHU VỰC TP.HCM</Text>
            </View>
            <ScrollView>
                <CinemaList data={data} />
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
