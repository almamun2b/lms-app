import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { counterReducer } from "./features/counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // baseApi,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { AppDispatch, RootState };
