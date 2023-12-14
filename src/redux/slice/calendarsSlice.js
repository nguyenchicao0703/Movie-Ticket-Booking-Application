import { createSlice } from '@reduxjs/toolkit';

// Slice của reducer và actions
const calendarsSlice = createSlice({
    name: 'calendar',
    initialState: {
        dates: '',
        isSelect: 0,
    },
    reducers: {
        getDate: (state, action) => {
            state.dates = action.payload;
        },
        isSelect: (state, action) => {
            state.isSelect = action.payload;
        },
        resetStateCalender: (state, action) => {
            state.dates = '';
            state.isSelect = 0;
        },
    },
});

export const { getDate, isSelect, resetStateCalender } = calendarsSlice.actions;

export default calendarsSlice.reducer;
