import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const showtimesAPI = {
    getAllMovies: (idMovie, dateMovie) => {
        return axiosClient.get(
            `/Danh-sach-suat-chieu-phim.php?id_phim=${idMovie}&ngay=2023-12-30`,
        );
    },
    getAllCinemas: (idCinema, dateMovie) => {
        console.log({ idCinema }, { dateMovie });
        return axiosClient.get(
            `/Danh-sach-suat-chieu-rap.php?id_rap=${idCinema}&ngay=2023-12-30`,
        );
    },
};

export default showtimesAPI;
