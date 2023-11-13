import { createSlice } from '@reduxjs/toolkit';

// Slice của reducer và actions
const calendarsSlice = createSlice({
    name: 'calendar',
    initialState: {},
    reducers: {
        selectDate: (state, action) => {
            state.dates = action.payload;
        },
    },
});

export const { selectDate } = calendarsSlice.actions;

export default calendarsSlice.reducer;
