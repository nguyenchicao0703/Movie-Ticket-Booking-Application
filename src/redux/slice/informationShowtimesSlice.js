import { createSlice } from '@reduxjs/toolkit';

// Slice của reducer và actions
const informationShowtimesSlice = createSlice({
    name: 'infomationShowtimes',
    initialState: {
        movie: '',
        cinema: '',
        price: 0,
        seats: '',
        showtime: '',
        date: '',
    },
    reducers: {
        getMovie: (state, action) => {
            state.movie = action.payload;
        },
        getCinema: (state, action) => {
            state.cinema = action.payload;
        },
        getPrice: (state, action) => {
            state.price = action.payload;
        },
        getSeats: (state, action) => {
            state.seats = action.payload;
        },
        getShowtimes: (state, action) => {
            state.showtime = action.payload;
        },
        getDate: (state, action) => {
            state.date = action.payload;
        },
    },
});

export const {
    getMovie,
    getCinema,
    getPrice,
    getSeats,
    getShowtimes,
    getDate,
} = informationShowtimesSlice.actions;

export default informationShowtimesSlice.reducer;
