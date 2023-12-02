import axiosClient from './axiosClient';

const billAPI = {
    watchBill: (idUser, idTicket) => {
        return axiosClient.get(
            `/Xem-bill.php?id_user=${idUser}&id_ve=${idTicket}`,
        );
    },
};

export default billAPI;
