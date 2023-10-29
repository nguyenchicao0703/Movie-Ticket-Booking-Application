import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CinemaList, Header, TabTopBar } from '../components';
import { Colors, Fonts } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../constants/Colors';
import Cinemas from '../constants/Cinemas';
const CinemaScreen = ({ navigation }) => {
    const back = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <Header onPress={back} titleHeader={'Chọn rạp'} />
            <TabTopBar text={'Gợi ý cho bạn'} />

            <ScrollView>
                <CinemaList data={Cinemas} />
                <TabTopBar text={'Khu vực TP.HCM'} />
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
});
