import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CinemaList, Header, Loading } from '../components';
import { Colors, Fonts } from '../constants';
import cinemaAPI from '../api/CinemaAPI';

const CinemaScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const fetchData = async () => {
        try {
            setIsLoading(false);
            const response = await cinemaAPI.getAll();
            setIsLoading(true);
            response.status ? setData(response.data) : setData([]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
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
            {!isLoading ? (
                <Loading />
            ) : (
                <CinemaList data={data} fetchData={fetchData} />
            )}
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
