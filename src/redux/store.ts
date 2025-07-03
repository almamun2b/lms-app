import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./features/books/booksApi";
import { counterReducer } from "./features/counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Api,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export { store };
