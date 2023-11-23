import { View, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CalendarCard } from '../card';
import { format, addDays } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectedDateSelector } from '../../redux/selectors';

const CalendarList = () => {
    const [weekSchedule, setWeekSchedule] = useState([]);
    const [isReadyToScroll, setIsReadyToScroll] = useState(false);

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

    const flatListRef = useRef(null);

    useEffect(() => {
        updateWeekSchedule();
        setIsReadyToScroll(false); // Đặt flag về false khi cập nhật lịch

        // Cập nhật lịch sau mỗi 1 phút
        const interval = setInterval(() => {
            updateWeekSchedule();
            setIsReadyToScroll(false); // Đặt flag về false khi cập nhật lịch
        }, 60000); // 1 phút

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        // Click vào item đầu tiên khi component được render lần đầu và weekSchedule có ít nhất 1 phần tử
        if (
            flatListRef.current &&
            flatListRef.current.scrollToIndex &&
            weekSchedule.length > 0 &&
            !isReadyToScroll
        ) {
            flatListRef.current.scrollToIndex({ index: 0, animated: true });
            setIsReadyToScroll(true); // Đặt flag về true sau khi đã scroll
        }
    }, [weekSchedule]);

    return (
        <View>
            <FlatList
                ref={flatListRef}
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
