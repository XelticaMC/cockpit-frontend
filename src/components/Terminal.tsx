import React, { HTMLProps, useRef } from 'react';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';

import { useAppSelector } from '../store';

export default function Terminal(p: HTMLProps<HTMLDivElement>) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const {log} = useAppSelector(state => state.server);

  return (
    <ScrollToBottom className="_term" ref={terminalRef} {...p}>
      {log.map(l => <>{l}<br/></>)}
    </ScrollToBottom>
  )
}
