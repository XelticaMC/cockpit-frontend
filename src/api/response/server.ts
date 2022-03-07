export interface ServerResponse {
  server: {
    type: 'paper',
    version: string,
    build: string,
  } | null;
  state: 'STOPPED' | 'UPDATING' | 'STARTING' | 'RUNNING' | 'STOPPING';
}