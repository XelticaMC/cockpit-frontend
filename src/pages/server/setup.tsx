import React, { useEffect, useState } from 'react'
import { postServerInstallAsync } from '../../api';
import { getPaperBuild, getPaperProject, getPaperVersion } from '../../api/paper';
import { PaperBuildResponse } from '../../api/response/paper';
import Loading from '../../components/Loading';
import { useTitle } from '../../hooks/useTitle'

export default function ServerSetupPage() {
  useTitle('セットアップ');
  const [versions, setVersions] = useState<string[]>([]);
  const [version, setVersion] = useState<string | null>(null);
  const [builds, setBuilds] = useState<number[]>([]);
  const [build, setBuild] = useState<number | null>(null);
  const [buildInfo, setBuildInfo] = useState<PaperBuildResponse | null>(null);
  const [isAgreeEula, setAgreeEula] = useState(false);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    getPaperProject().then(p => {
      setVersions(p.versions.reverse());
      setVersion(p.versions[0]);
    });
  }, []);

  useEffect(() => {
    setBuilds([]);
    setBuild(null);
    if (!version) return;
    getPaperVersion(version).then(p => {
      setBuilds(p.builds.reverse());
      setBuild(p.builds[0]);
    });
  }, [version]);

  useEffect(() => {
    setBuildInfo(null);
    if (!version || !build) return;
    getPaperBuild(version, build).then(p => setBuildInfo(p));
    setAgreeEula(false);
  }, [version, build]);

  const onClickStartSetup = () => {
    if (!version || !build || !buildInfo) return;
    postServerInstallAsync({
      version,
      build,
      file: buildInfo.downloads['application'].name,
    });
  };

  return (
    <article className="vstack">
      {versions.length > 0 ? (
        <section className="card">
          <div className="body">
            <h1>① バージョン</h1>
            <p>セットアップするサーバーのバージョンを選択してください。</p>
            <select className="input-field" value={version ?? undefined} onChange={e => setVersion(e.target.value)}>
              {versions.map(v => <option value={v} key={v}>{v}</option>)}  
            </select>
          </div>
        </section>
      ) : <div><Loading /></div>}
      {version !== null && (builds.length > 0 ? (
        <section className="card">
          <div className="body">
            <h1>② ビルド</h1>
            <p>ビルド番号を選択してください。</p>
            <select className="input-field" value={build ?? undefined} onChange={e => setBuild(parseInt(e.target.value))}>
              {builds.map(v => <option value={v} key={v}>{v}</option>)}  
            </select>
          </div>
        </section>
      ) : <div><Loading /></div>)}
      {version && build && (buildInfo ? (
        <section className="card">
          <div className="body">
            <h1>③ 確認</h1>
            <p>Paper {buildInfo.version} Build {buildInfo.build}</p>
            <blockquote>
              <ul>
                {buildInfo.changes.map(c => <li key={c.commit}>{c.summary}</li>)}
              </ul>
            </blockquote>
            <div className="vstack">
              <label className="input-check">
                <input type="checkbox" checked={isAgreeEula} onChange={e => setAgreeEula(e.target.checked)}/>
                <span>
                  <a href="https://www.minecraft.net/ja-jp/eula" target="_blank" rel="noopener noreferrer">
                    Minecraft EULA
                  </a>
                  に同意する
                  </span>
              </label>
              <label className="input-check">
                <input type="checkbox" checked={isChecked} onChange={e => setChecked(e.target.checked)}/>
                <span>サーバーに誰もいないことを確認した</span>
              </label>
            </div>
            <button className="btn primary mt-2" disabled={!isAgreeEula || !isChecked} onClick={onClickStartSetup}>
              <i className="fas fa-download"></i> セットアップを開始する
            </button>
          </div>
        </section>
      ) : <div><Loading /></div>)}
    </article>
  )
}
