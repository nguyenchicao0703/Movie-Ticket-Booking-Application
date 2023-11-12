import axiosClient from './axiosClient';

const usersAPI = {
    postUserWithMail: (email) => {
        return axiosClient.post('/dang-nhap-gmail.php', { email });
    },
    postUserWithPhoneNumber: (phone) => {
        return axiosClient.post('/dang-nhap-sdt.php', { phone });
    },
};
export default usersAPI;
