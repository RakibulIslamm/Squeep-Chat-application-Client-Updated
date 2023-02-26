import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    accessToken: '',
    authLogError: null,
    authRegError: null,
    regLoading: false,
    passUpdated: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            state.authLogError = null
            state.authRegError = null
            state.user = action.payload;
        },
        logOutUser: (state) => {
            state.authLogError = null
            state.authRegError = null
            state.user = {}
        },
        authLogError: (state, action) => {
            state.authLogError = action.payload
        },
        authRegError: (state, action) => {
            state.authRegError = action.payload
        },
        authRegLoading: (state, action) => {
            state.regLoading = action.payload;
        },
        passUpdated: (state, action) => {
            state.passUpdated = action.payload;
        }
    }
});

export default authSlice.reducer;
export const { getCurrentUser, logOutUser, authLogError, authRegError, authRegLoading, passUpdated } = authSlice.actions;