import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import modalSlice from "./features/modal/modalSlice";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
const persistConfig = {
    key: "auth",
    storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice);
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        modal: modalSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // ignore for redux persist
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
