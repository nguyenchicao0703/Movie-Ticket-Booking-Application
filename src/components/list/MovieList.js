import { FlatList } from 'react-native';
import React from 'react';
import MovieCard from '../card/MovieCard';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ data, listCase, navigation }) => {
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <MovieCard
                    data={item}
                    listCase={listCase}
                    navigation={navigation}
                />
            )}
        />
    );
};

export default MovieList;
