import { io } from 'socket.io-client';

const socket = io((process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'), {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 50
});

export default socket;