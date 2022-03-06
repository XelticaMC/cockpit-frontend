import React, { HTMLProps, useEffect, useRef } from 'react';
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import 'xterm/css/xterm.css';

export default function Terminal(p: HTMLProps<HTMLDivElement>) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;
    const term = new Xterm();
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    fitAddon.fit();

    term.onKey(e => {
      console.log(e)
      const ev = e.domEvent
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey

      if (ev.key === 'Enter') {
        term.write('\r\n %');
      } else if (ev.key === 'Backspace') {
        term.write('\b \b');
      } else if (printable) {
        term.write(e.key);
      }
    });

    // @ts-ignore // なぜかエラーなるので
    const observer = new ResizeObserver(() => {
      fitAddon.fit();
    });

    observer.observe(document.body);

    return () => {
      term.dispose();
      observer.disconnect();
    };
  }, []);
  

  return (
    <div className="_term" ref={terminalRef} {...p}></div>
  )
}
