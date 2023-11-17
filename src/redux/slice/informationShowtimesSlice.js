import { createSlice } from '@reduxjs/toolkit';

// Slice của reducer và actions
const informationShowtimesSlice = createSlice({
    name: 'infomationShowtimes',
    initialState: {
        movie: '',
        cinema: '',
        price: 0,
        positionSeating: '',
        showtime: '',
        date: '',
    },
    reducers: {
        setMovie: (state, action) => {
            state.movie = action.payload;
        },
        setCinema: (state, action) => {
            state.cinema = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setPositionSeating: (state, action) => {
            state.positionSeating = action.payload;
        },
        setShowtimes: (state, action) => {
            state.showtime = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
    },
});

export const {
    setMovie,
    setCinema,
    setPrice,
    setPositionSeating,
    setShowtimes,
    setDate,
} = informationShowtimesSlice.actions;

export default informationShowtimesSlice.reducer;
