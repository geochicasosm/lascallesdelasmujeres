import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';
import { useIsMobile } from '../../hooks';

export const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="app-layout">
      {!isMobile && <Sidebar />}
      {isMobile && <MobileMenu />}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
