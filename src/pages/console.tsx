import React, { KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';
import { postServerCommandAsync, postServerStartAsync, postServerStopAsync } from '../api';

import { NavbarItems } from '../App';
import Terminal from '../components/Terminal';
import { useTitle } from '../hooks/useTitle';
import { useAppDispatch, useAppSelector } from '../store';
import { setState } from '../store/slices/server';

export default function ConsolePage() {
  const {data} = useAppSelector(state => state.server);
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  const [command, setCommand] = useState('');

  const dispatch = useAppDispatch();

  useTitle('コンソール');

  useLayoutEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      if (!termRef.current) return;
      if (!commandRef.current) return;
      const termTop = termRef.current.getBoundingClientRect().top;
      const commandHeight = commandRef.current.getBoundingClientRect().height;
      const margin = parseInt(getComputedStyle(document.body).getPropertyValue('--margin'));
      const containerPadding = parseInt(getComputedStyle(document.body.querySelector('.container')!).getPropertyValue('--container-padding'));
      const termSize = document.documentElement.clientHeight - termTop - margin - commandHeight - containerPadding;
      termRef.current.style.height = termSize + 'px';
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, termRef.current, commandRef.current]);

  if (!data) return <>Loading...</>;

  const {state} = data;

  const isRunning = state === 'RUNNING';
  const isStopped = state === 'STOPPED';
  const isWaiting = state === 'UPDATING' || state === 'STARTING' || state === 'STOPPING';

  const isButtonDisabled = isWaiting;

  const onClickPlayButton = () => {
    if (isWaiting) return;
    if (isRunning) {
      postServerStopAsync();
      dispatch(setState('STOPPING'));
    } else {
      postServerStartAsync();
      dispatch(setState('STARTING'));
    }
  };

  const onKeyPressCommand = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      await postServerCommandAsync(command);
      setCommand('');
    }
  };

  return (
    <main className="vstack" ref={containerRef}>
      <NavbarItems.Source>
        <button className={`btn flat ${isRunning ? 'text-danger' : isStopped ? 'text-primary' : ''}`} disabled={isButtonDisabled} onClick={onClickPlayButton}>
          <i className={`fas fa-${isRunning ? 'stop' : isStopped ? 'play' : 'spinner'} fa-fw ${isWaiting ? 'fa-spin-pulse' : ''}`} />
        </button>
        <button className="btn flat" disabled={isButtonDisabled}>
          <i className="fas fa-rotate fa-fw" />
        </button>
      </NavbarItems.Source>
      <div className="bg-black pa-1 rounded" ref={termRef}>
        <Terminal/>
      </div>
      <div className="hgroup bg-panel rounded" ref={commandRef}>
        <label className="input-label">/</label>
        <input className="input-field bg-panel" type="text" placeholder="コマンド?" value={command} disabled={!isRunning} onChange={e => setCommand(e.target.value)} onKeyPress={onKeyPressCommand} />
      </div>
    </main>
  );
}


