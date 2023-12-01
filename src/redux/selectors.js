import { createSelector } from '@reduxjs/toolkit';

export const usersSelector = (state) => state.users;
export const idUsersSelector = (state) => state.users.users.data.id_user;
export const moviesListSelector = (state) => state.movies;
export const datesSelector = (state) => state.calendar;
export const bookingSelector = (state) => state.booking;
export const discountSelector = (state) => state.discount;
export const setCharirSelector = (state) => state.setCharir;
export const moviesRemainingSelector = createSelector(
    moviesListSelector,
    (movies) => {
        return movies;
    },
);

export const datesRemainingSelector = createSelector(datesSelector, (date) => {
    return date;
});
