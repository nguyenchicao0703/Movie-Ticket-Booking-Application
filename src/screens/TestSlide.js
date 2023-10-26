import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { MovieHomeCard } from '../components';
import { Movies } from '../constants';

const TestSlide = ({ data }) => {
    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={Movies}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <MovieHomeCard
                        data={item}
                        shoudlMarginatedAtEnd={true}
                        isFirst={index === 0 ? true : false}
                        isLast={index === Movies?.length - 1 ? true : false}
                        cardWidth={277}
                        cardHeight={422}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        height: 200,
    },
    slide: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TestSlide;
