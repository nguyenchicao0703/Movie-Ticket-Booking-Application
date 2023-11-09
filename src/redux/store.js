import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';

const store = configureStore({
    reducer: moviesSlice.reducer,
});

export default store;
