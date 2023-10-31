import { Text, Pressable } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../../constants';

const CalendarCard = ({
    data,
    isFirst,
    index,
    selectedDate,
    onSelectedDate,
}) => {
    const isSelected = selectedDate === index;
    const colorDate = isSelected ? Colors.DEFAULT_WHITE : Colors.DARK_BG;

    const handleSelectDate = (index) => {
        onSelectedDate(index);
    };

    return (
        <Pressable
            onPress={handleSelectDate}
            style={[
                {
                    flex: 1,
                    marginRight: 15,
                    width: 54,
                    height: 78,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                isFirst ? { marginLeft: 16 } : null,
                isSelected
                    ? {
                          borderWidth: 3,
                          borderColor: Colors.DARK_RED_BORDER,
                          backgroundColor: Colors.LIGHT_RED,
                          borderRadius: 12,
                      }
                    : {
                          backgroundColor: Colors.DEFAULT_WHITE,
                          borderRadius: 5,
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
                {data.date}
            </Text>
            <Text
                style={{
                    color: colorDate,
                    fontSize: 24,
                    fontFamily: Fonts.Bold,
                }}
            >
                {data.day}
            </Text>
        </Pressable>
    );
};

export default CalendarCard;
