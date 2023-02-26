import { socket } from "../../utils/Socket.io/socket";
import apiSlice from "../api/apiSlice";


export const messageAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ conversationId, email }) => `/messages?conversationId=${conversationId}`,
            async onCacheEntryAdded({ conversationId, email }, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                try {
                    await cacheDataLoaded;
                    socket.on('message', (data) => {
                        updateCachedData(draft => {
                            // console.log(JSON.parse(JSON.stringify(draft)));
                            // console.log(data);
                            if (conversationId === data.conversationId && (data.message === 'Audio call' || data.message === 'Video call')) {
                                draft.unshift(data);
                            }
                            else if (conversationId === data.conversationId && email !== data?.sender?.email) {
                                draft.unshift(data);
                            };
                        });
                    });

                    socket.on('delete-message', data => {
                        updateCachedData(draft => {
                            for (const message of draft) {
                                if (message._id === data._id) {
                                    message.message = 'message deleted';
                                    message.img = '';
                                    return;
                                }
                            }
                        })
                    })

                }
                catch (err) {

                }
                finally {
                    await cacheEntryRemoved;
                }
            }

        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/send-message`,
                method: "POST",
                body: data
            })
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/delete-message/${id}`,
                method: "DELETE"
            })
        }),
    })
})

export const { useGetMessagesQuery, useSendMessageMutation, useDeleteMessageMutation } = messageAPI;