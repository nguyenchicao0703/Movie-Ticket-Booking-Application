import { createSlice } from '@reduxjs/toolkit';

const setChairsSlice = createSlice({
    name: 'setCharir',
    initialState: {
        idShowtime: 0,
        listSeat: [],
        // selectedSeats: [],
        // storageSeats: '',
        // totalPrice: '',
        // indexSeat: []
    },
    reducers: {
        setIdShowtimes: (state, action) => {
            state.idShowtime = action.payload;
        },
        setListSeat: (state, action) => {
            state.listSeat = action.payload;
        },
    },
});

export const { setIdShowtimes, setListSeat } = setChairsSlice.actions;

export default setChairsSlice.reducer;
