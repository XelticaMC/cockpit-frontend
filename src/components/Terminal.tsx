import React, { HTMLProps, useEffect, useRef, useState } from 'react';

import { getServerLogAsync } from '../api';
import { useAppSelector } from '../store';

import 'xterm/css/xterm.css';

export default function Terminal(p: HTMLProps<HTMLDivElement>) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const {data} = useAppSelector(state => state.server);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (!terminalRef.current) return;
    setLog([]);

    getServerLogAsync().then(logs => logs.forEach(append));
  }, []);

  useEffect(() => {
    if (!data) return;
    if (data.server === null) {
      append('有効な Minecraft サーバーがインストールされていないようです。サーバーページへ移動し、インストールを開始してください。');
    }
  }, [data]);

  const append = (text: string) => {
    setLog(l => [...l, text]);
  };
  

  return (
    <div className="_term" ref={terminalRef} {...p}>
      {log.map(l => <>{l}<br/></>)}
    </div>
  )
}
