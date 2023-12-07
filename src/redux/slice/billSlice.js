import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
    name: 'bill',
    initialState: {
        tenphim: '',
        ngaychieu: '',
        giochieu: '',
        tenrap: '',
        soghe: '',
        tenphong: '',
        giavecombo: '',
        sotiengiam: '',
        tongtien: '',
    },
});

export default billSlice.reducer;
