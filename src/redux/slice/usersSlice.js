import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginAPI from '../../api/usersAPI';
import usersAPI from '../../api/usersAPI';
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
            });
    },
});

export default usersSlice;

// Action thunk để lấy danh sách phim từ API
export const fetchUsers = createAsyncThunk('users/fetchUser', async (phone) => {
    try {
        const response = await usersAPI.postUserWithPhoneNumber(phone);
        const user = response;
        // console.log(user);

        // console.log('Fetch movies successfully: ', response.data.data);
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

            // console.log('Fetch movies successfully: ', response.data.data);
            return user;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
);
