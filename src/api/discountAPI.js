import axios from 'axios';
import axiosClient from './axiosClient';

const discountAPI = {
    getbyID: (id_user) => {
        return axiosClient.get(`/Danh-sach-ma-giam-gia.php?id_user=${id_user}`);
    },
};
export default discountAPI;
