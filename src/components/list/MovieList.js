import { FlatList } from 'react-native';
import React from 'react';
import MovieCard from '../card/MovieCard';

const MovieList = ({ data, listCase }) => {
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id_phim}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <MovieCard data={item} listCase={listCase} />
            )}
        />
    );
};

export default MovieList;
