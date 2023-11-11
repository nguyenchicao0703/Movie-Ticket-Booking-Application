import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const showtimesAPI = {
    getAll: (idMovie, idCinema, dateMovie) => {
        return axiosClient.get(
            `/Danh-sach-suat-chieu.php?id_phim=${idMovie}&id_rap=${idCinema}&ngay=${dateMovie}`,
        );
    },
};

export default showtimesAPI;
