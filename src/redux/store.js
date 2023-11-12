import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slice/moviesSlice';

const store = configureStore({
    reducer: { movies: moviesSlice },
});

export default store;
