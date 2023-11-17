import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slice/moviesSlice';
import usersSlice from './slice/usersSlice';
import calendarsSlice from './slice/calendarsSlice';
import informationShowtimesSlice from './slice/informationShowtimesSlice';

const store = configureStore({
    reducer: {
        movies: moviesSlice,
        users: usersSlice,
        calendar: calendarsSlice,
        informationShowtimes: informationShowtimesSlice,
    },
});

export default store;
