import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slice/moviesSlice';

const store = configureStore({
    reducer: moviesSlice.reducer,
});

export default store;
