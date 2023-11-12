import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const showtimesAPI = {
    getIdCinema: (idMovie) => {
        return axiosClient.get(`/Danh-sach-rap-theo-phim.php?id=${idMovie}`);
    },
    getAll: (idMovie, idCinema, dateMovie) => {
        return axiosClient.get(
            `/Danh-sach-suat-chieu.php?id_phim=${idMovie}&id_rap=${idCinema}&ngay=${dateMovie}`,
        );
    },
};

export default showtimesAPI;
