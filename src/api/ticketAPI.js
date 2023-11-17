import axiosClient from './axiosClient';

const ticketAPI = {
    getAll: (idUser) => {
        return axiosClient.get(`/Danh-sach-ve-cua-toi.php?id_user=${idUser}`);
    },
};
export default ticketAPI;
