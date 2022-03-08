import ReconnectingWebSocket from "reconnecting-websocket";
import { ServerResponse } from "./response/server";

export type EventMap = {
  'server.log.clear': void,
  'server.log': string,
  'server.update': ServerResponse['server'],
  'server.update.state': ServerResponse['state'],
};

type EventHandler<T extends keyof EventMap> = (payload: EventMap[T]) => void;

class Streaming {
  constructor() {
    if (!process.env.REACT_APP_WS_BASE) throw new TypeError();
    this.ws = new ReconnectingWebSocket(process.env.REACT_APP_WS_BASE);
    this.ws.addEventListener('message', m => {
      const data = JSON.parse(m.data);
      if (!['server.log', 'server.log.clear', 'server.update', 'server.update.state'].includes(data.type)) {
        console.warn('Unknown data type: ' + data.type);
        return;
      }
      this.emit(data.type, data.body);
    });
  }

  on<T extends keyof EventMap>(type: T, callback: EventHandler<T>): void {
    this.events[type].push(callback);
  }
  off<T extends keyof EventMap>(type: T, callback: EventHandler<T>): void {
    this.events[type] = this.events[type].filter(c => c !== callback);
  }
  emit<T extends keyof EventMap>(type: T, event?: EventMap[T]): void {
    this.events[type].forEach(e => e(event));
  }

  private events: Record<keyof EventMap, Function[]> = {
    'server.log.clear': [],
    'server.log': [],
    'server.update': [],
    'server.update.state': [],
  };

  private ws: ReconnectingWebSocket;
}

const streaming = new Streaming();

export default streaming;