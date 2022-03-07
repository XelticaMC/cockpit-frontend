import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setMenuOpen } from '../store/slices/screen';
import { MenuItem, MenuSection, MenuView } from './MenuView';

export default function Drawer() {
  const {isMenuOpen} = useAppSelector(state => state.screen);
  const dispatch = useAppDispatch();
  const close = () => dispatch(setMenuOpen(false));
  return (
    <div className={`drawer-container ${isMenuOpen ? 'active' : ''}`}>
      <div className="backdrop" onClick={close} />
      <div className="drawer">
        <header>
          <button className="close">
            <i className="fas fa-times"></i>
          </button>
          <h1>XelticaMC Cockpit</h1>
        </header>
        <div className="body">
          <MenuView>
            <MenuSection>
              <h1>オーナー</h1>
              <MenuItem icon="fas fa-user-group" type="link" label="スタッフ管理" to="/staffs" onClick={close} />
            </MenuSection>
            <MenuSection>
              <h1>モデレーター</h1>
              <MenuItem icon="fas fa-server" type="link" label="サーバー管理" to="/server" onClick={close} />
              <MenuItem icon="fas fa-terminal" type="link" label="コンソール" to="/console" onClick={close} />
              <MenuItem icon="fas fa-plug" type="link" label="プラグイン管理" to="/plugins" onClick={close} />
              <MenuItem icon="fas fa-magic" type="link" label="コマンド" to="/commands" onClick={close} />
            </MenuSection>
          </MenuView>
        </div>
      </div>
    </div>
  )
}
