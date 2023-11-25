import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersAPI from '../../api/usersAPI';
import { State } from 'react-native-gesture-handler';

// Slice của reducer và actions
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
    },
    reducers: {
        updateUser: (state, action) => {
            state.state = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
        },
        setUserDataAsyn: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {})
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(fetchUsersMail.pending, (state) => {}) // Cập nhật tên action type
            .addCase(fetchUsersMail.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUsersMail.rejected, (state, action) => {
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
export const { setUserDataAsyn } = usersSlice.actions;
// export const { updateUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;

// Action thunk để lấy danh sách phim từ API
export const fetchUsers = createAsyncThunk('users/fetchUser', async (phone) => {
    try {
        const response = await usersAPI.postUserWithPhoneNumber(phone);
        const user = response;

        // console.log('userSlice', gender, email);
        return user;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
});

export const fetchUsersMail = createAsyncThunk(
    'users/fetchUsersMail',
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
