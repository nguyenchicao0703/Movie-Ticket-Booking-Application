import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
import { CalendarList, Header } from '../components';

const SelectShowtimeScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.DARK_BG }}>
            <Header titleHeader={'Chọn suất chiếu'} />
            <Text
                style={{
                    fontSize: 18,
                    color: Colors.DEFAULT_WHITE,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 15,
                    marginTop: 20,
                    marginBottom: 10,
                }}
            >
                Chọn ngày
            </Text>
            <CalendarList />
        </View>
    );
};

export default SelectShowtimeScreen;

const styles = StyleSheet.create({});
