import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { CalendarCard } from '../card';
import { format, addDays, startOfWeek } from 'date-fns';

const createWeekSchedule = () => {
    const weekStart = startOfWeek(new Date());
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
        const day = addDays(weekStart, i);
        weekDays.push(day);
    }

    return weekDays;
};

const CalendarList = () => {
    const [selectedDate, setSelectedDate] = useState(0);
    const weekSchedule = createWeekSchedule();

    const handleSelectDate = (index) => {
        setSelectedDate(index);
    };

    return (
        <View>
            <FlatList
                data={weekSchedule}
                extraData={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <CalendarCard
                        date={format(item, 'dd')} // Ngày
                        day={format(item, 'eeee')} // Thứ
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
