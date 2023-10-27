import { FlatList, useWindowDimensions } from 'react-native';
import React from 'react';
import HomeCard from '../card/HomeCard';

const HomeList = ({ data }) => {
    const { width, height, fontScale } = useWindowDimensions();

    return (
        <FlatList
            style={{
                marginTop: 8,
            }}
            data={data}
            extraData={(item) => item.id}
            horizontal={true}
            snapToInterval={width * 0.6 + 15}
            decelerationRate={0}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <HomeCard
                    data={item}
                    shoudlMarginatedAtEnd={true}
                    isFirst={index === 0 ? true : false}
                    isLast={index === data?.length - 1 ? true : false}
                    cardWidth={width * 0.6}
                    cardHeight={height * 0.5}
                    nameScale={fontScale * 16}
                    timeScale={fontScale * 12}
                />
            )}
        />
    );
};

export default HomeList;
