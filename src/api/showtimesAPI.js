import axiosClient from './axiosClient';

// Hàm gửi yêu cầu GET
const showtimesAPI = {
    getAll: (idMovie, dateMovie) => {
        return axiosClient.get(
            `/Danh-sach-suat-chieu-phim.php?id_phim=${idMovie}&ngay=2023-12-30`,
        );
    },
};

export default showtimesAPI;
