import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScratchState {
  isOpen: boolean;
  prize: string;
  isRevealed: boolean;
}

const initialState: ScratchState = {
  isOpen: false,
  prize: "🎉 You won 15% OFF!",
  isRevealed: false,
};

const scratchSlice = createSlice({
  name: "scratch",
  initialState,
  reducers: {
    openScratch(state) {
      state.isOpen = true;
      state.isRevealed = false;
    },
    closeScratch(state) {
      state.isOpen = false;
    },
    revealPrize(state) {
      state.isRevealed = true;
    },
    setPrize(state, action: PayloadAction<string>) {
      state.prize = action.payload;
    },
  },
});

export const { openScratch, closeScratch, revealPrize, setPrize } =
  scratchSlice.actions;

export default scratchSlice.reducer;
