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

const ComboScreen = ({ navigation }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const dataBooking = useSelector(bookingSelector);
    // console.log({ dataBooking });

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
            ) : data.length === 0 ? (
                <View
                    style={{
                        flex: 1,
                        alignSelf: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ alignSelf: 'center' }}>
                        <NoShowtimeMessage title={'Không có Combo'} />
                    </View>
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
