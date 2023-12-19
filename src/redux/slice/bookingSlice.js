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
        changeState: 0,
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
                (item) => item?.id === newItem?.id,
            );
            if (existingItem) {
                existingItem.soluong += newItem.soluong;
                existingItem.price = existingItem.soluong * newItem.price;
                if (existingItem.soluong === 0 || newItem.soluong === 0) {
                    state.combo = state.combo.filter(
                        (item) => item?.id !== newItem?.id,
                    );
                }
            } else {
                state.combo.push(newItem);
            }
        },
        resetCombo: (state, action) => {
            state.combo = action.payload;
        },
        changeState: (state, action) => {
            state.changeState += action.payload;
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
    resetCombo,
    changeState,
} = bookingSlice.actions;

export default bookingSlice.reducer;
