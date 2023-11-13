import { View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CalendarCard } from '../card';
import { format, addDays, startOfWeek } from 'date-fns';

const CalendarList = () => {
    const [weekSchedule, setWeekSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState(0);

    console.log({ selectedDate });

    useEffect(() => {
        const updateWeekSchedule = () => {
            const currentDate = new Date(); // Lấy thời gian thực
            const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
            const weekDays = [];

            // 1 tuần
            for (let i = 0; i < 7; i++) {
                const day = addDays(weekStart, i);
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
                        isFirst={index === 0}
                        index={index}
                        selectedDate={selectedDate}
                        onSelectedDate={() => handleSelectDate(index)}
                        data={format(item, 'yyyy-MM-dd')}
                    />
                )}
            />
        </View>
    );
};

export default CalendarList;
