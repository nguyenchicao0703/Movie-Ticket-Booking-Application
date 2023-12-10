// const BASE_URL = 'http://10.0.2.2:1234/api'; // URL cơ sở của API

import axios from 'axios';
const BASE_URL = 'https://mvtk.pro.vn/api'; // URL cơ sở của API trên admin

// const BASE_URL = 'http://192.168.100.4:1234/api'; // URL cơ sở của API máy thật

// Hàm chung để gửi yêu cầu HTTP
const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Return response.data -> tránh lập lại code
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
    },
    (error) => {
        console.log('Error response data', error);
        throw error;
    },
);

export default axiosClient;
