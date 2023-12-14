import { Text, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicket } from '../redux/slice/ticketsSlice';
import { ticketsSelector } from '../redux/selectors';
import { fetchMovies } from '../redux/slice/moviesSlice';

const NoShowtimeMessage = ({ title, listCase }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const dispatch = useDispatch();
    const idUser = useSelector(ticketsSelector);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            if (listCase === 'NoTicket') {
                dispatch(fetchTicket(idUser.users.data?.id_user));
            } else if (listCase === 'NoMovie') {
                dispatch(fetchMovies());
            }
            setRefreshing(false);
        }, 1000);
    }, [dispatch, idUser.users.data?.id_user, listCase]);

    if (listCase === 'NoTicket' || listCase === 'NoMovie') {
        return (
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: Colors.OPACITY_MEDIUM_GRAY_LINE,
                        fontFamily: Fonts.Light,
                        fontSize: 15,
                        marginTop: 10,
                    }}
                >
                    {title}
                </Text>
            </ScrollView>
        );
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text
                style={{
                    textAlign: 'center',
                    color: Colors.OPACITY_MEDIUM_GRAY_LINE,
                    fontFamily: Fonts.Light,
                    fontSize: 15,
                    marginTop: 10,
                }}
            >
                {title}
            </Text>
        </ScrollView>
    );
};

export default React.memo(NoShowtimeMessage);
