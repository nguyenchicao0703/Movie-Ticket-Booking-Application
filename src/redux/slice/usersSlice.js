import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersAPI from '../../api/usersAPI';
import { State } from 'react-native-gesture-handler';

// Slice của reducer và actions
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {})
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase('users/resetUsers', (state) => {
                state.users = [];
            });
    },
});
export const resetUsers = () => ({
    type: 'users/resetUsers',
});

export default usersSlice.reducer;

// Action thunk để lấy danh sách phim từ API
export const fetchUsers = createAsyncThunk('users/fetchUser', async (phone) => {
    try {
        const response = await usersAPI.postUserWithPhoneNumber(phone);
        const user = response;
        // console.log(user);
        return user;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
});

export const fetchUsersMail = createAsyncThunk(
    'users/fetchUser',
    async (email) => {
        try {
            const response = await usersAPI.postUserWithMail(email);
            const user = response;
            // console.log(user);
            return user;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
);
