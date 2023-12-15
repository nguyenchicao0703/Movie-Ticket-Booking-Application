import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        movieName: '',
        movieImage: '',
        cinemaName: '',
        dateShowtime: '',
        showtime: '',
        seatsIndex: '',
        room: '',
        totalPayment: 0,
        combo: [],
    },
    reducers: {
        setMovieName: (state, action) => {
            state.movieName = action.payload;
        },
        setMovieImage: (state, action) => {
            state.movieImage = action.payload;
        },
        setCinemaName: (state, action) => {
            state.cinemaName = action.payload;
        },
        setDateShowtime: (state, action) => {
            state.date = action.payload;
        },
        setShowtime: (state, action) => {
            state.showtime = action.payload;
        },
        setSeatsIndex: (state, action) => {
            state.seatsIndex = action.payload;
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        setTotalPayment: (state, action) => {
            state.totalPayment = action.payload;
        },
        setCombo: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.combo.find(
                (item) => item.id === newItem.id,
            );
            if (existingItem) {
                existingItem.soluong += newItem.soluong;
            } else {
                state.combo.push(newItem);
            }
        },
    },
});

export const {
    setMovieName,
    setMovieImage,
    setCinemaName,
    setDateShowtime,
    setShowtime,
    setSeatsIndex,
    setTotalPayment,
    setRoom,
    setCombo,
} = bookingSlice.actions;

export default bookingSlice.reducer;
