import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    unseenMessages: 0
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        totalUnseenMessages: (state, action) => {
            state.unseenMessages = action.payload;
        }
    }
});

export const { totalUnseenMessages } = notificationSlice.actions;
export default notificationSlice.reducer;