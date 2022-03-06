import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import Terminal from './components/Terminal';

function App() {
  const [date, setDate] = useState(dayjs());
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => setDate(dayjs()), 200);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const resize = () => {
      console.log([
        containerRef,
        termRef,
        commandRef,
      ]);
      if (!containerRef.current) return;
      if (!termRef.current) return;
      if (!commandRef.current) return;
      const termTop = termRef.current.getBoundingClientRect().top;
      const commandHeight = commandRef.current.getBoundingClientRect().height;
      const margin = parseInt(getComputedStyle(document.body).getPropertyValue('--margin'));
      const containerPadding = parseInt(getComputedStyle(document.body.querySelector('.container')!).getPropertyValue('--container-padding'));
      const termSize = document.documentElement.clientHeight - termTop - margin - commandHeight - containerPadding;
      console.log(margin);
      termRef.current.style.height = termSize + 'px';
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return (
    <>
      <div className="navbar bg-panel shadow-4">
        <button className="btn flat mr-2">
          <i className="fas fa-bars fa-fw" />
        </button>
        <h1 className="navbar-title mr-2">
          コンソール
        </h1>
        <button className="btn flat text-danger">
          <i className="fas fa-stop fa-fw" />
        </button>
        <button className="btn flat">
          <i className="fas fa-rotate fa-fw" />
        </button>
        <div className="ml-auto text-center text-75">
          {date.format('YYYY/MM/DD')}<br/>
          {date.format(`hh:mm:ss`)}
        </div>
      </div>
      <div className="container hstack fill" ref={containerRef}>
        <main className="vstack">
          <div className="bg-black pa-1 rounded" ref={termRef}>
            <Terminal/>
          </div>
          <div className="hgroup bg-panel rounded" ref={commandRef}>
            <label className="input-label">/</label>
            <input className="input-field bg-panel" type="text" placeholder="コマンド?" />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
