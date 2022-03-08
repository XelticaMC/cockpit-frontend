import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { postServerStartAsync, postServerStopAsync } from '../../api';
import { useTitle } from '../../hooks/useTitle';
import { useAppDispatch, useAppSelector } from '../../store';
import { setState } from '../../store/slices/server';

export default function ServerPage() {
  useTitle('サーバー管理');

  const {data} = useAppSelector(state => state.server);
  const dispatch = useAppDispatch();

  const isRunning = data.state === 'RUNNING';
  const isStopped = data.state === 'STOPPED';
  const isWaiting = !isRunning && !isStopped;

  const color = isRunning ? 'green' : isStopped ? 'red' : 'yellow';

  const buttonText = useMemo(() => {
    return {
      RUNNING: '停止する',
      STOPPED: '起動する',
      STARTING: '起動中…',
      STOPPING: '停止中',
      UPDATING: '更新中…',
    }[data.state];
  }, [data.state]);

  const stateText = useMemo(() => {
    return {
      RUNNING: '起動済み',
      STOPPED: '停止済み',
      STARTING: '起動中…',
      STOPPING: '停止中',
      UPDATING: '更新中…',
    }[data.state];
  }, [data.state]);

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

  return !data.server ? (
    <>
      <p>まだサーバーソフトウェアがインストールされていません。</p>
      <Link to="/server/setup" className="btn primary px-5">
        <i className="fas fa-download fa-fw" />
        セットアップ
      </Link>
    </>
  ) : (
    <>
      <div className="card">
        <div className="body relative">
          <p className="text-150">
            <i className={`fa-solid fa-circle ${color === 'yellow' ? 'fa-fade' : ''} text-${color} mr-1`}/>
            {stateText}
          </p>
          <p>
            <span className="text-125">{data.server.type[0].toUpperCase() + data.server.type.substring(1)} {data.server.version} </span>
            <span className="text-dimmed">(Build: {data.server.build})</span>
          </p>
          <div className="hstack slim">
            <button className={`btn ${isRunning ? 'danger' : 'primary'}`} disabled={isWaiting} onClick={onClickPlayButton}>
              <i className={`fas fa-${isRunning ? 'stop' : isStopped ? 'play' : 'spinner'} fa-fw mr-1 ${isWaiting ? 'fa-spin-pulse' : ''}`} />
              {buttonText}
            </button>
            {data.state === 'STOPPED' ? (
              <Link to="/server/setup" className="btn primary outline">
                <i className="fas fa-rotate fa-fw mr-1" />
                サーバーを更新
              </Link>
            ) : (
              <button className="btn primary outline" disabled>
                <i className="fas fa-rotate fa-fw mr-1" />
                サーバーを更新
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
