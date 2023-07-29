import { configureStore } from "@reduxjs/toolkit";
import tvSlice from "./features/tvSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice from "./features/authSlice";
import { tvApi } from "./api/tvApi";

export const store = configureStore({
    reducer:{
        tv: tvSlice,
        auth:authSlice,
        [tvApi.reducerPath]: tvApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(tvApi.middleware)
})

// Need this in order to use useDipatch and useSelctor
export const Dispatch:()=>typeof store.dispatch=useDispatch
export const UseSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;