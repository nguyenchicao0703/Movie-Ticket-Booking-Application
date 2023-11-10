import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:1234/api'; // URL cơ sở của API

// Hàm chung để gửi yêu cầu HTTP
const axiosClient = (method, url, data) => {
    return axios
        .request({
            method,
            url: `${BASE_URL}${url}`,
            data,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('API error:', error);
            throw error;
        });
};

export default axiosClient;