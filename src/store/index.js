import { configureStore } from "@reduxjs/toolkit";
import rootReducers from './rootReducers'
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middlewares = []

const persistConfig = {
    key: 'react-app-admin',
    keyPrefix: '',
    storage,
    whitelist: ['adminLogin']
}

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducers),
    devTools: true,
    middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
            immutableCheck: false,
			serializableCheck: false,
		}).concat(middlewares),
})

export const persistor = persistStore(store)
export default store