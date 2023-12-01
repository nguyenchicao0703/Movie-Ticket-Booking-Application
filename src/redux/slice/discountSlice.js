import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        discountCode: '',
        discountTime: '',
        discountPayment: 0,
    },
    reducers: {
        setDiscountCode: (state, action) => {
            state.discountCode = action.payload;
        },
        setDiscountTime: (state, action) => {
            state.discountTime = action.payload;
        },
        setDiscountPayment: (state, action) => {
            state.discountPayment = action.payload;
        },
    },
});

export const { setDiscountCode, setDiscountTime, setDiscountPayment } =
    discountSlice.actions;

export default discountSlice.reducer;
