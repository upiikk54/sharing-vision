import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./slices/AdminReducer";

const rootReducer = {
    admin: AdminReducer,
}

const store = configureStore({
    reducer: rootReducer
});

export default store;