import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const movieAPI = {
    getAll: () => {
        return axiosClient.get('/Danh-sach-phim.php');
    },
};

export default movieAPI;
