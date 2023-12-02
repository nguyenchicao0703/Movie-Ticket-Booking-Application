import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slice/moviesSlice';
import usersSlice from './slice/usersSlice';
import calendarsSlice from './slice/calendarsSlice';
import bookingSlice from './slice/bookingSlice';
import setChairsSlice from './setChairsSlice';

import discountSlice from './slice/discountSlice';

const store = configureStore({
    reducer: {
        movies: moviesSlice,
        users: usersSlice,
        calendar: calendarsSlice,
        booking: bookingSlice,
        setCharir: setChairsSlice,
        discount: discountSlice,
    },
});

export default store;
