import { configureStore } from "@reduxjs/toolkit";
import scratchReducer from "./scratchSlice";

export const cardFeature = configureStore({
  reducer: {
    scratch: scratchReducer,
  },
});

export type RootState = ReturnType<typeof cardFeature.getState>;
export type AppDispatch = typeof cardFeature.dispatch;
