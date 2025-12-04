import { configureStore } from "@reduxjs/toolkit";
import scratchReducer from "./scratchSlice";

export const store = configureStore({
  reducer: {
    scratch: scratchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
