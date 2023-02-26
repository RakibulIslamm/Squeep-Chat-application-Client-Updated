import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    activeUsers: []
}

const activeUserSlice = createSlice({
    name: 'activeUsers',
    initialState,
    reducers: {
        activeUsers: (state, action) => {
            state.activeUsers = action.payload;
        }
    }
});

export const { activeUsers } = activeUserSlice.actions;
export default activeUserSlice.reducer;