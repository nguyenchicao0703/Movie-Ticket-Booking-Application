import { FlatList } from 'react-native';
import React from 'react';
import MovieCard from '../card/MovieCard';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ data, listCase }) => {
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <MovieCard data={item} listCase={listCase} />
            )}
        />
    );
};

export default MovieList;
