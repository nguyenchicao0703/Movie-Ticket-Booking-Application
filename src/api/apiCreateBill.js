import axiosClient from './axiosClient';

const BillAPI = {
    postBill: (idUser, idSuat, idKm, tongTien, soGhe, listCombo) => {
        return axiosClient.post('/Tao-bill.php', {
            id_user: idUser,
            id_suat: idSuat,
            id_km: idKm,
            tongtien: tongTien,
            soghe: soGhe,
            listcombo: [listCombo],
        });
    },
};

export default BillAPI;
