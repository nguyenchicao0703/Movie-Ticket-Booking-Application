import { io } from 'socket.io-client';
const socket = io('https://socket.mvtk.pro.vn', {
    autoConnect: false,
});
export default socket;
