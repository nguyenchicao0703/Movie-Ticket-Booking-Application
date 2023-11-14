import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const movieAPI = {
    getAll: () => {
        return axiosClient
            .get('/Danh-sach-phim.php')
            .catch((error) => console.log('ERROR API MOVIE: ', error));
    },

    getMovieDetails: (idMovie) => {
        return axiosClient
            .get(`http://10.0.2.2:1234/api/Chi-tiet-phim.php?id=${idMovie}`)
            .catch((error) => console.log('ERROR API DETAIL MOVIE: ', error));
    },
};

export default movieAPI;
