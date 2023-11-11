import axios from 'axios';
import axiosClient from './axiosClient';

const comboAPI = {
    getAll: () => {
        return axiosClient.get('/Danh-sach-combo.php');
    },
};
export default comboAPI;
