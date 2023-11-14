import { View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CalendarCard } from '../card';
import { format, addDays } from 'date-fns';
import { useSelector } from 'react-redux';

const CalendarList = () => {
    const [weekSchedule, setWeekSchedule] = useState([]);

    const isSelected = useSelector((state) => state.calendar.isSelect);
    console.log(isSelected);

    useEffect(() => {
        const updateWeekSchedule = () => {
            const currentDate = new Date(); // Lấy thời gian thực
            const weekDays = [];

            // 1 tuần
            for (let i = 0; i < 7; i++) {
                const day = addDays(currentDate, i);
                weekDays.push(day);
            }

            setWeekSchedule(weekDays);
        };

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
                extraData={(item) => item.id}
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
