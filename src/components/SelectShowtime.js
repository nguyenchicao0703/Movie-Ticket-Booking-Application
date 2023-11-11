import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React from 'react';
import { Colors, Fonts, ShowtimeMovie } from '../constants';
import { useNavigation } from '@react-navigation/native';

const SelectShowtime = ({ marginTop }) => {
    const navigation = useNavigation();

    const handleButtonClickItem = () => {
        navigation.navigate('Seat');
    };

    return (
        <>
            <FlatList
                style={{ alignSelf: 'center' }}
                data={ShowtimeMovie}
                extraData={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Pressable
                            onPress={handleButtonClickItem}
                            style={{
                                height: 45,
                                paddingHorizontal: 8,
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: Colors.LIGHT_SILVER,
                                justifyContent: 'center',
                                marginTop: 5,
                                marginHorizontal: 12,
                                marginBottom: 5,
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
                                {item.time}
                            </Text>
                        </Pressable>
                    </View>
                )}
            />
        </>
    );
};

export default SelectShowtime;

const styles = StyleSheet.create({});
