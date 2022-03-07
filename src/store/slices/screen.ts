import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  isMenuOpen: false,
}

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setTitle(state, {payload}: PayloadAction<string>) {
      state.title = payload;
    },
    setMenuOpen(state, {payload}: PayloadAction<boolean>) {
      state.isMenuOpen = payload;
    }
  }
});

export const {
  setTitle,
  setMenuOpen,
} = screenSlice.actions;

export default screenSlice.reducer;
