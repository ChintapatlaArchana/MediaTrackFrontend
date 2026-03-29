import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlay, FaSearch, FaRegUser, FaRegBell } from 'react-icons/fa';
import { MdHome, MdOutlineMovie, MdLiveTv, MdOutlineSubscriptions } from 'react-icons/md';
 
const ViewerSidebar = () => {
  const location = useLocation();
 
  const styles = {
    sidebar: {
      width: '80px',
      height: '100vh',
      backgroundColor: '#0f1115',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
      zIndex: 1000,
      borderRight: '1px solid #1a1c23'
    },
    logoContainer: {
      width: '40px',
      height: '40px',
      backgroundColor: '#7A32F0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      marginBottom: '40px',
      textDecoration: 'none',
    },
    logoIcon: {
      color: '#fff',
      fontSize: '20px',
    },
    navItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#717380',
      marginBottom: '25px',
      fontSize: '10px',
      fontWeight: '500',
      transition: 'color 0.2s',
      cursor: 'pointer'
    },
    activeNavItem: {
      color: '#7A32F0',
    },
    icon: {
      fontSize: '24px',
      marginBottom: '5px',
    },
    spacer: {
      flex: 1,
    },
    bottomItems: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px'
    }
  };
 
  const NavLink = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to || (to === '/viewer/home' && location.pathname === '/viewer');
    return (
      <Link to={to} style={{ ...styles.navItem, ...(isActive ? styles.activeNavItem : {}) }}>
        <Icon style={styles.icon} />
        {label}
      </Link>
    );
  };
 
  return (
    <div style={styles.sidebar}>
      <Link to="/viewer" style={styles.logoContainer}>
        <FaPlay style={styles.logoIcon} />
      </Link>
     
      <NavLink to="/viewer/home" icon={MdHome} label="Home" />
      <NavLink to="/viewer/search" icon={FaSearch} label="Search" />
      <NavLink to="/viewer/movies" icon={MdOutlineMovie} label="Movies" />
      <NavLink to="/viewer/tv-shows" icon={MdLiveTv} label="TV Shows" />
      <NavLink to="/viewer/subscription" icon={MdOutlineSubscriptions} label="Subscription" />
 
      <div style={styles.spacer}></div>
 
      <div style={styles.bottomItems}>
        <NavLink to="/viewer/myspace" icon={FaRegUser} label="MySpace" />
        <NavLink to="/viewer/notifications" icon={FaRegBell} label="Notifications" />
      </div>
    </div>
  );
};
 
export default ViewerSidebar;