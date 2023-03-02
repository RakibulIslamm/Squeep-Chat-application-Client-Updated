import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { socket } from '../../utils/Socket.io/socket';


const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://squeep.glitch.me',
        prepareHeaders: async (headers, { getState, endpoint }) => {
            if (endpoint === 'sendMessage') {
                socket.connect();
                socket.on('connect', function (data) {
                    //socket.emit('join', name);
                    // console.log(data)
                });
            }
        }
    }),
    tagTypes: ['friends', 'user', 'newPeople', 'profileImageUpdated', 'delete-message'],
    endpoints: (builder) => ({

    })
});

export default apiSlice;