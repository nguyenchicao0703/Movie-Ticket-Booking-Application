import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const movieAPI = {
    getAll: () => {
        return axiosClient
            .get('/Danh-sach-phim.php')
            .catch((error) => console.log('ERROR API MOVIE: ', error));
    },
};

export default movieAPI;
