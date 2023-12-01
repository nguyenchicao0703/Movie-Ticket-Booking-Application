import { Text, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import { Colors, Fonts } from '../../constants';
import { useDispatch } from 'react-redux';
import { getDate, isSelect } from '../../redux/slice/calendarsSlice';

const caseDay = {
    Monday: 'Th 2',
    Tuesday: 'Th 3',
    Wednesday: 'Th 4',
    Thursday: 'Th 5',
    Friday: 'Th 6',
    Saturday: 'Th 7',
    Sunday: 'CN',
};

const CalendarCard = ({
    data,
    day, // Thứ
    date, // Ngày
    isFirst,
    index,
    selectedDate,
}) => {
    const isSelected = selectedDate === index;
    const colorDate = isSelected ? Colors.DEFAULT_WHITE : Colors.DARK_BG;

    const dispatch = useDispatch();

    const handleSelectDateCard = useCallback(() => {
        // console.log('dispatch');
        dispatch(getDate(data));
        dispatch(isSelect(index));
    }, [data, index, dispatch]);

    const _day = caseDay[day] || '';

    return (
        <Pressable
            onPress={handleSelectDateCard}
            style={[
                {
                    flex: 1,
                    marginRight: 15,
                    width: 54,
                    height: 78,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                isFirst ? { marginLeft: 10 } : null,
                isSelected
                    ? {
                          borderWidth: 3,
                          borderColor: Colors.DARK_RED_BORDER,
                          backgroundColor: Colors.LIGHT_RED,
                          borderRadius: 5,
                      }
                    : {
                          backgroundColor: Colors.DEFAULT_WHITE,
                          borderRadius: 10,
                      },
            ]}
        >
            <Text
                style={{
                    color: colorDate,
                    fontSize: 16,
                    marginTop: 7,
                    fontFamily: Fonts.Bold,
                }}
            >
                {_day}
            </Text>
            <Text
                style={{
                    color: colorDate,
                    fontSize: 24,
                    fontFamily: Fonts.Bold,
                }}
            >
                {date}
            </Text>
        </Pressable>
    );
};

export default CalendarCard;
