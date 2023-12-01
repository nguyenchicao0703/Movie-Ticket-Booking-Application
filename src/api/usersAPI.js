import axiosClient from './axiosClient';

const usersAPI = {
    postRegisterUserWithPhoneNumber: (phone, password) => {
        return axiosClient.post('/Dang-ky-tai-khoan-sdt.php', {
            phone,
            password,
        });
    },
    postUserWithPhoneNumber: (phone, password) => {
        return axiosClient.post('/Dang-nhap-sdt.php', {
            phone,
            password,
        });
    },
    postUserWithMail: (email) => {
        return axiosClient.post('/Dang-nhap-gmail.php', { email });
    },
    postCheckPhoneNumber: (phone) => {
        return axiosClient.post(`/Check-sdt.php?sdt=${phone}`);
    },
    postUpdateProfile: (data) => {
        return axiosClient.post('/Cap-nhat-thong-tin.php', data);
    },
};
export default usersAPI;
