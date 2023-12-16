import { createSlice } from '@reduxjs/toolkit';

// Slice của reducer và actions
const selectedSeatsSlice = createSlice({
    name: 'selectedSeats',
    initialState: {
        selectedSeats: [],
    },
    reducers: {
        setSelectedSeats: (state, action) => {
            state.selectedSeats = action.payload;
        },
    },
});

export const { setSelectedSeats } = selectedSeatsSlice.actions;

export default selectedSeatsSlice.reducer;
