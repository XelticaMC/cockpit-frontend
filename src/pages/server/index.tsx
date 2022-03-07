import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useTitle } from '../../hooks/useTitle';
import { useAppSelector } from '../../store';

export default function ServerPage() {
  const {data} = useAppSelector(state => state.server);
  useTitle('サーバー管理');
  if (!data) {
    return <div className="flex f-center"><Loading /></div>;
  }
  const color = data.state === 'RUNNING' ? 'green' : data.state === 'STOPPED' ? 'red' : 'yellow';
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
          <p className="text-150"><span className={`text-${color}`}>●</span> {data.state}</p>
          <p>
            <span className="text-125">{data.server.type[0].toUpperCase() + data.server.type.substring(1)} {data.server.version} </span>
            <span className="text-dimmed">(Build: {data.server.build})</span>
          </p>
          <div className="abs-top-right-2">
            <Link to="/server/setup" className="btn primary outline">サーバーを更新</Link>
          </div>
        </div>
      </div>
    </>
  );
}
