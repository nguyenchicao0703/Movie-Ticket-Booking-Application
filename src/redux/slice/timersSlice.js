import { createSlice } from '@reduxjs/toolkit';

const timersSlice = createSlice({
    name: 'timer',
    initialState: {
        timer: null,
    },
    reducers: {
        timer: (state, action) => {
            state.timer = action.payload;
        },
    },
});

export const { timer } = timersSlice.actions;

export default timersSlice.reducer;
