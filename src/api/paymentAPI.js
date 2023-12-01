import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const showtimesAPI = {
    getAllMovies: () => {
        return axiosClient.post(`/Thong-tin-hoa-don.php`);
    },
};

export default showtimesAPI;
