import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slice/moviesSlice';
import usersSlice from './slice/usersSlice';

const store = configureStore({
    reducer: { movies: moviesSlice.reducer, users: usersSlice.reducer },
});

export default store;
