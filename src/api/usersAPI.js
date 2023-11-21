import axiosClient from './axiosClient';

const usersAPI = {
    postRegisterUserWithPhoneNumber: (phone) => {
        console.log({ phone });
        return axiosClient.post('/Dang-ky-tai-khoan-sdt.php', { phone });
    },
    postUserWithPhoneNumber: (phone) => {
        return axiosClient.post('/Dang-nhap-sdt.php', { phone });
    },
    postUserWithMail: (email) => {
        return axiosClient.post('/Dang-nhap-gmail.php', { email });
    },
    postCheckPhoneNumber: (phone) => {
        return axiosClient.post(`/Check-sdt.php?sdt=${phone}`);
    },
};
export default usersAPI;
