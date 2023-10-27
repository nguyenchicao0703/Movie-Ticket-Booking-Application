import { FlatList } from 'react-native';
import React from 'react';
import MovieCard from '../card/MovieCard';

const MovieList = ({ data }) => {
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <MovieCard data={item} />}
        />
    );
};

export default MovieList;
