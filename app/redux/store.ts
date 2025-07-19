
import { configureStore } from '@reduxjs/toolkit';
import prescriptionsReducer from './slices/PrescriptionsSlice';

export const store = configureStore({
    reducer: {
        prescriptions: prescriptionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
