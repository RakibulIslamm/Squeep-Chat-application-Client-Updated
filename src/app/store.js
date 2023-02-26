import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import toggleReducer from '../features/toggle/toggleSlice';
import activeUserReducer from '../features/activeUser/activeUserSlice'
import notificationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    toggle: toggleReducer,
    activeUsers: activeUserReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});
