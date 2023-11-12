import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieAPI from '../../api/movieAPI';

// Slice của reducer và actions
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        status: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = false;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = true;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = true;
                state.error = action.error.message;
            });
    },
});

export default moviesSlice.reducer;

// Action thunk để lấy danh sách phim từ API
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    try {
        const response = await movieAPI.getAll();
        console.log('Fetch movies successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
});
