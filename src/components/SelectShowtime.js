import { Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
import { useNavigation } from '@react-navigation/native';

const SelectShowtime = ({ data }) => {
    const navigation = useNavigation();

    const navigationShowtimeMovieToSeat = () => {
        navigation.navigate('Seat');
    };

    return (
        <>
            <Text
                style={{
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 15,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 15,
                    marginTop: 3,
                }}
            >
                Chọn thời gian
            </Text>
            <FlatList
                style={{
                    marginLeft: 12,
                }}
                data={data}
                extraData={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={navigationShowtimeMovieToSeat}
                        style={{
                            width: '30%',
                            height: 45,
                            paddingHorizontal: 8,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: Colors.LIGHT_SILVER,
                            justifyContent: 'center',
                            marginTop: 5,
                            marginBottom: 5,
                            marginRight: 12,
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.LIGHT_SILVER,
                                fontSize: 14,
                                fontFamily: Fonts.Bold,
                                textAlign: 'center',
                            }}
                        >
                            {item}
                        </Text>
                    </Pressable>
                )}
            />
        </>
    );
};

export default SelectShowtime;
