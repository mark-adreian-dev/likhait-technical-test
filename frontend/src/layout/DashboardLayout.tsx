import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { COLORS } from '../constants/colors';
import { Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(location.pathname.replace("/", ""));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const appStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: isSidebarCollapsed ? "80px" : "360px",
    transition: "margin-left 0.3s ease",
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
     setCurrentPage(location.pathname.replace("/", ""));
  }, [location.pathname])

  return (
    <div style={appStyle}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      <main style={mainStyle}>
        <Outlet />
      </main>  
    </div>
  )
}
