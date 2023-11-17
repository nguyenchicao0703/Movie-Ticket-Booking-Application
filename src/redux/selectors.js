export const usersSelector = (state) => state.users;
export const idUsersSelector = (state) => state.users.users.data.id_user;
export const moviesListSelector = (state) => state.movies.movies;
export const datesSelector = (state) => state.calendar.dates;
export const selectedDateSelector = (state) => state.calendar.isSelect;
export const informationShowtimesSelector = (state) =>
    state.informationShowtimes;
