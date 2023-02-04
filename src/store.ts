import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import orderReducer from "./features/orderSlice";

export  const store = configureStore({
    reducer: {
        order: orderReducer

    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
