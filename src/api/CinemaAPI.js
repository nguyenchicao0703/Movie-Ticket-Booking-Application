import axiosClient from './axiosClient';

const cinemaAPI = {
    getAll: () => {
        return axiosClient.get('/Danh-sach-rap.php');
    },
};

export default cinemaAPI;
