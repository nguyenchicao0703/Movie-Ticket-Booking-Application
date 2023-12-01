import axiosClient from './axiosClient';

const comboAPI = {
    getAll: () => {
        return axiosClient.get('/Danh-sach-combo.php');
    },
    postInfomationPayment: (idShowtime, quantityTicket, combo, idDiscount) => {
        return axiosClient.post('/Thong-tin-hoa-don.php', {
            id_suat: idShowtime,
            soluongve: quantityTicket,
            combo,
            id_mkm: idDiscount,
        });
    },
};
export default comboAPI;
