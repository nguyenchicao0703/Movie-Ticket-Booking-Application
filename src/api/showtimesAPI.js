import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const showtimesAPI = {
    getAllMovies: (idMovie, dateMovie) => {
        console.log({ idMovie }, { dateMovie });
        return axiosClient.get(
            `/Danh-sach-suat-chieu-phim.php?id_phim=${idMovie}&ngay=${dateMovie}`,
        );
    },
    getAllCinemas: (idCinema, dateMovie) => {
        console.log({ idCinema }, { dateMovie });
        return axiosClient.get(
            `/Danh-sach-suat-chieu-rap.php?id_rap=${idCinema}&ngay=${dateMovie}`,
        );
    },
};

export default showtimesAPI;
