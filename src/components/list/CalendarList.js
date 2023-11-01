import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { CalendarCard } from '../card';
import { SelectDate } from '../../constants';

const CalendarList = () => {
    const [selectedDate, setSelectedDate] = useState(0);

    const handleSelectDate = (index) => {
        setSelectedDate(index);
        console.log({ index });
    };
    return (
        <View>
            <FlatList
                data={SelectDate}
                extraData={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <CalendarCard
                        data={item}
                        isFirst={index === 0 ? true : false}
                        index={index}
                        selectedDate={selectedDate}
                        onSelectedDate={() => handleSelectDate(index)}
                    />
                )}
            />
        </View>
    );
};

export default CalendarList;
