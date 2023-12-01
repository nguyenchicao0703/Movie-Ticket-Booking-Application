import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Header,
    InformationBottom,
    Loading,
    NoShowtimeMessage,
} from '../components';
import ComboList from '../components/list/ComboList';
import { Colors } from '../constants';
import comboAPI from '../api/comboAPI';
import { useSelector, useDispatch } from 'react-redux';
import { bookingSelector } from '../redux/selectors';

const ComboScreen = ({ navigation, route }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { idShowtimes, quantityTicket } = route.params;

    // console.log({ idShowtimes }, { quantityTicket });

    const dataBooking = useSelector(bookingSelector);
    // console.log({ dataBooking });

    const handleButtonMenu = () => {
        navigation.openDrawer();
    };

    const handleButtonBack = () => {
        navigation.goBack(null);
    };

    const navigationComboToPayment = async () => {
        try {
            const response = await comboAPI.postInfomationPayment(
                idShowtimes,
                quantityTicket,
                dataBooking.combo,
                0,
            );
            // console.log({ response });
            navigation.navigate('Payment');
        } catch (error) {
            console.log('Error response Combo', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await comboAPI.getAll();
                // console.log(response.data);
                setIsLoading(true);
                response.status ? setData(response.data) : setData([]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header
                titleHeader={'Combo bắp & nước'}
                onButtonBack={handleButtonBack}
                onButtonMenu={handleButtonMenu}
            />
            {!isLoading ? (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignSelf: 'center',
                    }}
                >
                    <Loading />
                </View>
            ) : (
                <ComboList
                    data={data}
                    totalPayment={dataBooking.totalPayment}
                />
            )}
            <InformationBottom
                nameMovie={dataBooking.movieName}
                seat={dataBooking.seatsIndex}
                totalPayment={dataBooking.totalPayment}
                onPress={navigationComboToPayment}
            />
        </SafeAreaView>
    );
};

export default ComboScreen;
