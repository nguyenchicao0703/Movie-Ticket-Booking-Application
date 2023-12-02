import { createSlice } from '@reduxjs/toolkit';

const seatsSlice = createSlice({
    name: 'seatString',
    initialState: {
        seatString: '',
    },
    reducers: {
        setSeatString: (state, action) => {
            state.seatString = action.payload;
        },
    },
});

export const { setSeatString } = seatsSlice.actions;

export default seatsSlice.reducer;
