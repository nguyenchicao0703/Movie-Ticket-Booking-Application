import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketAPI from '../../api/ticketAPI';

// Slice của reducer và actions
const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTicket.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchTicket.fulfilled, (state, action) => {
                state.loading = true;
                state.tickets = action.payload;
            })
            .addCase(fetchTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ticketsSlice.reducer;

// Action thunk để lấy danh sách phim từ API
export const fetchTicket = createAsyncThunk(
    'tickets/fetchTicket',
    async (idUser) => {
        try {
            const response = await ticketAPI.getAll(idUser);
            // console.log('Fetch movies successfully: ', response);
            if (!response.data) return [];
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    },
);
