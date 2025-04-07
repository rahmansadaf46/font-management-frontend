// src/store/fontSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FontState {
  renderFontList: number;
}

const initialState: FontState = {
  renderFontList: 0,
};

const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    setRenderFontList: (state, action: PayloadAction<number>) => {
      state.renderFontList = action.payload;
    },
  },
});

export const { setRenderFontList } = fontSlice.actions;
export default fontSlice.reducer;
