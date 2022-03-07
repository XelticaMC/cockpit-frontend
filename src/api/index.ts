import { ServerInstallBody } from "./bodies/server-install";
import { ServerResponse } from "./response/server";

export async function getAsync<T>(endpoint: string, q?: Record<string, string>) {
  const query = q ? ('?' + Object.entries(q).map(v => `${v[0]}=${encodeURIComponent(v[1])}`).join('&')) : '';
  const url = `${process.env.REACT_APP_API_BASE}/${endpoint}${query}`;
  const res = await fetch(url, {
    method: 'GET',
  });
  return res.json().then(d => d as T);
}

export async function postAsync<T>(endpoint: string, body?: Record<string, any>) {
  const url = `${process.env.REACT_APP_API_BASE}/${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json().then(d => d as T);
}

export function getServerAsync() {
  return getAsync<ServerResponse>('server');
}

export function getServerLogAsync() {
  return getAsync<string[]>('server/log');
}

export function postServerInstallAsync(body: ServerInstallBody) {
  return postAsync<any>('server/install', body);
}

export function postServerStartAsync() {
  return postAsync<any>('server/start');
}

export function postServerStopAsync() {
  return postAsync<any>('server/stop');
}
