import { io } from 'socket.io-client';
var connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
};
export const socket = io("https://squeep.glitch.me", connectionOptions);

