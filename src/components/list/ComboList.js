import { FlatList } from 'react-native';
import React from 'react';
import CinemaCard from '../card/CinemaCard';
import ComboCard from '../card/ComboCard';

const ComboList = ({ data }) => {
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id_combo}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ComboCard data={item} />}
        />
    );
};

export default ComboList;
