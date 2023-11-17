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
    },
});

export const { getDate, isSelect } = calendarsSlice.actions;

export default calendarsSlice.reducer;
