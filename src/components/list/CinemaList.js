import { FlatList, RefreshControl } from 'react-native';
import React from 'react';
import CinemaCard from '../card/CinemaCard';

const CinemaList = ({ data, fetchData }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchData();
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <FlatList
            data={data}
            extraData={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => <CinemaCard data={item} />}
        />
    );
};

export default CinemaList;
