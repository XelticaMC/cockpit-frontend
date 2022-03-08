import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServerResponse } from '../../api/response/server';

const initialState = {
  data: {
    server: null,
    state: 'UPDATING',
  } as ServerResponse,
  log: [] as string[],
}

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setData(state, {payload}: PayloadAction<ServerResponse>) {
      state.data = payload;
    },
    setState(state, {payload}: PayloadAction<ServerResponse['state']>) {
      state.data.state = payload;
    },
    setServer(state, {payload}: PayloadAction<ServerResponse['server']>) {
      state.data.server = payload;
    },
    setLog(state, {payload}: PayloadAction<string[]>) {
      state.log = payload;
    },
    appendLog(state, {payload}: PayloadAction<string>) {
      state.log.push(payload);
    },
    clearLog(state, _: PayloadAction<void>) {
      state.log = [];
    },
  }
});

export const {
  setData,
  setState,
  setServer,
  setLog,
  appendLog,
  clearLog,
} = serverSlice.actions;

export default serverSlice.reducer;
