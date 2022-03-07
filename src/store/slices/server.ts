import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServerResponse } from '../../api/response/server';

const initialState = {
  data: null as ServerResponse | null,
}

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setData(state, {payload}: PayloadAction<ServerResponse>) {
      state.data = payload;
    },
    setState(state, {payload}: PayloadAction<ServerResponse['state']>) {
      if (!state.data) return;
      state.data.state = payload;
    },
  }
});

export const {
  setData,
  setState,
} = serverSlice.actions;

export default serverSlice.reducer;
