import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
export const get = (url) => {
    return axiosClient('GET', url);
};

export default { get };
