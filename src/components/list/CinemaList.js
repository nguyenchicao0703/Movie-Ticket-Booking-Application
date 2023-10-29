import { FlatList } from 'react-native';
import React from 'react';
import CinemaCard from '../card/CinemaCard';
import Cinemas from '../../constants/Cinemas';

const CinemaList = ({ data }) => {
    const logCheck = () => {
        console.log({ data });
    };
    return (
        <FlatList
            data={data}
            extraData={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <CinemaCard onPress={logCheck} data={item} />
            )}
        />
    );
};

export default CinemaList;
