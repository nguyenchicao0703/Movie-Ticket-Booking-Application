import { createSlice } from '@reduxjs/toolkit';

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        discountId: 0,
        discountCode: '',
        discountTime: '',
        discountPayment: 0,
    },
    reducers: {
        setDiscountId: (state, action) => {
            state.discountId = action.payload;
        },
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

export const {
    setDiscountId,
    setDiscountCode,
    setDiscountTime,
    setDiscountPayment,
} = discountSlice.actions;

export default discountSlice.reducer;
