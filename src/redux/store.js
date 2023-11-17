import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slice/moviesSlice';
import usersSlice from './slice/usersSlice';
import calendarsSlice from './slice/calendarsSlice';

const store = configureStore({
    reducer: {
        movies: moviesSlice,
        users: usersSlice,
        calendar: calendarsSlice,
    },
});

export default store;
