const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    sidebarToggle: false,
    conversationInfo: false,
}

const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        collapseSidebar: (state) => {
            state.sidebarToggle = !state.sidebarToggle;
        },
        handleConversationInfo: (state, action) => {
            state.conversationInfo = action.payload;
        },
    }
});

export const { collapseSidebar, handleConversationInfo } = toggleSlice.actions;
export default toggleSlice.reducer