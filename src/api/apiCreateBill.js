import axiosClient from './axiosClient';

const BillAPI = {
    postBill: (idUser, idSuat, idKm, tongTien, soGhe, idCombo, soLuong) => {
        return axiosClient.post('/Tao-bill.php', {
            id_user: idUser,
            id_suat: idSuat,
            id_km: idKm,
            tongtien: tongTien,
            soghe: soGhe,
            listcombo: [{ id: idCombo, soluong: soLuong }],
        });
    },
};

export default BillAPI;
