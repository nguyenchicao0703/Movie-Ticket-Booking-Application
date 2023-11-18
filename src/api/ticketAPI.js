import axiosClient from './axiosClient';

const ticketAPI = {
    getAll: (idUser) => {
        return axiosClient.get(`/Danh-sach-ve-cua-toi.php?id_user=${idUser}`);
    },
    postBookTicket: (idUser, idShowtimes, storageSeats) => {
        return axiosClient.post('/Dat-ve.php', {
            id_user: idUser,
            id_suat: idShowtimes,
            listghe: storageSeats,
        });
    },
};
export default ticketAPI;
