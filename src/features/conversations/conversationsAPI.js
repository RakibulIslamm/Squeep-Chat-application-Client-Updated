import { socket } from "../../utils/Socket.io/socket";
import apiSlice from "../api/apiSlice";

export const conversationsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // API goes here
        addConversation: builder.mutation({
            query: ({ data, email }) => ({
                url: `/conversations`,
                method: 'POST',
                body: data
            })
        }),
        updateConversation: builder.mutation({
            query: ({ messageData, id, email }) => ({
                url: `/conversations/${id}`,
                method: 'PUT',
                body: messageData
            }),
            async onQueryStarted({ messageData, id, email }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getConversations', email, (draft) => {
                        draft.forEach(conv => {
                            if (conv._id === id) {
                                conv.lastMessage = messageData.messageText;
                                conv.sender = messageData.email;
                                conv.timestamp = messageData.timestamp;
                                conv.img = messageData.img;
                                conv.sent = {
                                    messageSent: true,
                                    timestamp: new Date().getTime()
                                }
                                return;
                            }
                        });
                        draft.sort((x, y) => {
                            return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
                        })
                    })
                )
                try {
                    await queryFulfilled;
                }
                catch (err) {
                    patchResult.undo();
                }
                finally {

                }
            }
        }),

        getConversations: builder.query({
            query: (email) => `/conversations?email=${email}`,
            async onCacheEntryAdded(args, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
                socket.on("updateConversation", async ({ data, id }) => {
                    await cacheDataLoaded;
                    updateCachedData(draft => {
                        for (const c of draft) {
                            if (c._id === id) {
                                c.lastMessage = data.lastMessage;
                                c.sender = data.sender;
                                c.timestamp = data.timestamp;
                                c.img = data.img;
                                c.delivered = data.delivered;
                                c.sent = data.sent;
                                c.unseenMessages += 1;
                                return;
                            }
                        }
                        draft.sort((x, y) => {
                            return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
                        })
                    })
                });

                socket.on("lastSeen", async (data) => {
                    await cacheDataLoaded;
                    updateCachedData(draft => {
                        for (const c of draft) {
                            if (c._id === data.id) {
                                // console.log(data);
                                c.lastSeen = data.data.lastSeen;
                                return;
                            }
                        }
                    })
                });

                socket.on('message-notification-update', data => {
                    // console.log(data);
                    updateCachedData(draft => {
                        for (const conversation of draft) {
                            if (conversation._id === data.id) {
                                conversation.unseenMessages = 0;
                            }
                        }
                    });
                });


                socket.on('delivering', id => {
                    updateCachedData(draft => {
                        for (const conversation of draft) {
                            if (conversation._id === id) {
                                socket.emit('delivered', id);
                            }
                        }
                    });
                });

                socket.on('delivered', data => {
                    updateCachedData(draft => {
                        for (const conversation of draft) {
                            if (conversation._id === data._id) {
                                conversation.delivered = data.delivered;
                            }
                        }
                    });

                })
                await cacheEntryRemoved;
            }
        }),

        getSearchedConversation: builder.query({
            query: ({ text, email }) => `/search-conversations?search=${text}&email=${email}`
        }),

        getSingleConversation: builder.query({
            query: (id) => `/conversation/${id}`,
            async onCacheEntryAdded(args, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
                socket.on("updateConversation", async ({ data, id }) => {
                    await cacheDataLoaded;
                    updateCachedData(draft => {
                        if (draft._id === id) {
                            draft.lastMessage = data.lastMessage;
                            draft.sender = data.sender;
                            draft.timestamp = data.timestamp;
                            draft.delivered = data.delivered;
                            draft.sent = data.sent;
                            draft.unseenMessages += 1;
                            return;
                        }
                    })
                });

                socket.on("lastSeen", async (data) => {
                    await cacheDataLoaded;
                    updateCachedData(draft => {
                        if (draft._id === data.id) {
                            draft.lastSeen = data.data.lastSeen;
                        }
                    })
                });

                socket.on('message-notification-update', data => {
                    // console.log(data);
                    updateCachedData(draft => {
                        if (draft._id === data.id) {
                            draft.unseenMessages = 0;
                        }
                    })
                });

                socket.on('delivered', data => {
                    updateCachedData(draft => {
                        if (draft?._id === data?._id) {
                            draft.delivered = data.delivered;
                        }
                    });

                })

                await cacheEntryRemoved;
            }
        }),

        changeConversationStatus: builder.mutation({
            query: ({ conversationId, email }) => ({
                url: `/conversation-status/${conversationId}`,
                method: 'PUT',
                body: { isFriend: true }
            }),
            async onQueryStarted({ email }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // console.log(result);
                    dispatch(
                        apiSlice.util.updateQueryData('getConversations', email, (draft) => {
                            draft.unshift(result);
                        })
                    )
                }
                catch (err) {

                }
                finally {

                }
            }
        })

    })
})

export const { useAddConversationMutation, useChangeConversationStatusMutation, useGetConversationsQuery, useGetSingleConversationQuery, useUpdateConversationMutation, useGetSearchedConversationQuery } = conversationsAPI;