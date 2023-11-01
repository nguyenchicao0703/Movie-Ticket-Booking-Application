import { FlatList } from 'react-native';
import React from 'react';
import CinemaCard from '../card/CinemaCard';

const CinemaList = ({ data }) => {
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CinemaCard data={item} />}
        />
    );
};

export default CinemaList;
