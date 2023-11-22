import { View, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { CalendarCard } from '../card';
import { format, addDays } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectedDateSelector } from '../../redux/selectors';

const CalendarList = () => {
    const [weekSchedule, setWeekSchedule] = useState([]);

    const isSelected = useSelector(selectedDateSelector);

    const updateWeekSchedule = useCallback(() => {
        const currentDate = new Date(); // Lấy thời gian thực
        const weekDays = [];

        // 1 tuần
        for (let i = 0; i < 7; i++) {
            const day = addDays(currentDate, i);
            weekDays.push(day);
        }

        setWeekSchedule(weekDays);
    }, []);

    useEffect(() => {
        updateWeekSchedule();

        // Cập nhật lịch sau mỗi 1 phút
        const interval = setInterval(() => {
            updateWeekSchedule();
        }, 60000); // 1 phút

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View>
            <FlatList
                data={weekSchedule}
                extraData={weekSchedule}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <CalendarCard
                        date={format(item, 'dd')} // Ngày
                        day={format(item, 'eeee')} // Thứ
                        isFirst={index === 0}
                        index={index}
                        selectedDate={isSelected}
                        data={format(item, 'yyyy-MM-dd')}
                    />
                )}
            />
        </View>
    );
};

export default CalendarList;
