import { FlatList, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import MovieCard from '../card/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/slice/moviesSlice';
import { fetchTicket } from '../../redux/slice/ticketsSlice';
import { usersSelector } from '../../redux/selectors';

const MovieList = ({ data, listCase }) => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const idUser = useSelector(usersSelector);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            if (listCase === 'moviePresent' || listCase === 'movieUpcoming') {
                dispatch(fetchMovies());
            } else if (
                listCase === 'TicketViewed' ||
                listCase === 'TicketUnView'
            ) {
                dispatch(fetchTicket(idUser.users.data?.id_user));
            }
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <FlatList
            data={data}
            extraData={(item) => item.id_phim}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
                <MovieCard data={item} listCase={listCase} />
            )}
        />
    );
};

export default MovieList;
