import { createSelector } from '@reduxjs/toolkit';

export const moviesListSelector = (state) => state.movies;

export const moviesRemainingSelector = createSelector(
    moviesListSelector,
    (moviesList) => {
        return moviesList;
    },
);
