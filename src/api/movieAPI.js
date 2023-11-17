import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const movieAPI = {
    getAll: () => {
        return axiosClient.get('/Danh-sach-phim.php');
    },

    getMovieDetails: (idMovie) => {
        return axiosClient.get(`/Chi-tiet-phim.php?id=${idMovie}`);
    },
};

export default movieAPI;
