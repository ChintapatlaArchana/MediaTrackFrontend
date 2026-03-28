import React, { useState } from 'react';
import { FaPlayCircle, FaRegCreditCard, FaExclamationCircle, FaCrown, FaCog, FaTimes, FaTrashAlt, FaCheck, FaBell } from 'react-icons/fa';
import { MdOutlineTrendingUp } from 'react-icons/md';

const ViewerNotifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  const styles = {
    container: {
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
      padding: '40px 60px',
      paddingBottom: '80px',
    },
    headerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    bellIconWrapper: {
      position: 'relative',
      fontSize: '28px',
      color: '#7A32F0',
      display: 'flex',
      alignItems: 'center',
    },
    bellBadge: {
      position: 'absolute',
      top: '-4px',
      left: '-8px',
      backgroundColor: '#7A32F0',
      color: '#fff',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      fontSize: '11px',
      fontWeight: '700',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #0a0d14',
    },
    headerTitleBox: {
      display: 'flex',
      flexDirection: 'column',
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#fdfdfd',
      margin: '0 0 4px 0',
    },
    headerSubtitle: {
      color: '#a0a3b1',
      fontSize: '14px',
      margin: 0,
    },
    markReadBtn: {
      backgroundColor: 'rgba(122, 50, 240, 0.15)',
      color: '#b690f7',
      border: '1px solid rgba(122, 50, 240, 0.3)',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    tabsRow: {
      display: 'flex',
      gap: '12px',
      marginBottom: '30px',
      borderBottom: '1px solid #1f2129',
      paddingBottom: '20px',
    },
    tabBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      backgroundColor: '#151720',
      color: '#a0a3b1',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    tabBtnActive: {
      backgroundColor: '#7A32F0',
      color: '#fff',
    },
    tabBadge: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '2px 6px',
      borderRadius: '12px',
      fontSize: '11px',
    },
    tabBadgeActive: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    notificationsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    card: {
      backgroundColor: '#12141c',
      border: '1px solid #1f2129',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'border-color 0.2s',
    },
    cardUnread: {
      backgroundColor: '#161324',
      border: '1px solid rgba(122, 50, 240, 0.4)',
    },
    cardHovered: {
      borderColor: 'rgba(122, 50, 240, 0.4)',
    },
    cardLeft: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
    },
    iconBox: {
      width: '45px',
      height: '45px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#a0a3b1',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      flexShrink: 0,
    },
    iconBoxUnread: {
      backgroundColor: 'rgba(122, 50, 240, 0.15)',
      color: '#b690f7',
    },
    contentBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    notifTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#fff',
    },
    notifDesc: {
      fontSize: '14px',
      color: '#d1d2d8',
      lineHeight: '1.4',
    },
    notifTime: {
      fontSize: '12px',
      color: '#717380',
      marginTop: '4px',
    },
    cardRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '16px',
      flexShrink: 0,
    },
    unreadIndicators: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    unreadDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#7A32F0',
      borderRadius: '50%',
    },
    checkBtn: {
      backgroundColor: 'rgba(122, 50, 240, 0.2)',
      color: '#b690f7',
      border: 'none',
      width: '24px',
      height: '24px',
      borderRadius: '6px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '10px',
    },
    actionIcons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      color: '#717380',
      marginTop: '12px',
    },
    actionIcon: {
      cursor: 'pointer',
      transition: 'color 0.2s',
      fontSize: '12px',
    }
  };

  const tabs = [
    { label: 'All', count: 7 },
    { label: 'Unread', count: 2 },
    { label: 'Read', count: 4 },
    { label: 'Dismissed', count: 1 },
  ];

  const notifications = [
    {
      id: 1,
      type: 'release',
      icon: <FaPlayCircle />,
      title: 'New Release Available',
      desc: 'Epic Adventure Season 2 is now streaming. Start watching now!',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'billing',
      icon: <FaRegCreditCard />,
      title: 'Subscription Renewal',
      desc: 'Your Premium subscription will renew on April 10, 2026 for $14.99',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'recommendation',
      icon: <MdOutlineTrendingUp />,
      title: 'Recommended for You',
      desc: 'Based on your viewing history, we think you\'ll love "Space Odyssey"',
      time: '5 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'system',
      icon: <FaExclamationCircle />,
      title: 'Download Complete',
      desc: 'Future Vision S1:E5 is ready for offline viewing',
      time: '1 day ago',
      unread: false
    },
    {
      id: 5,
      type: 'premium',
      icon: <FaCrown />,
      title: 'Exclusive Content',
      desc: 'As a Premium member, you now have access to exclusive early releases',
      time: '2 days ago',
      unread: false
    },
    {
      id: 6,
      type: 'maintenance',
      icon: <FaCog />,
      title: 'System Maintenance',
      desc: 'Scheduled maintenance on March 20, 2026 from 2:00 AM - 4:00 AM EST',
      time: '3 days ago',
      unread: false
    },
    {
      id: 7,
      type: 'payment',
      icon: <FaRegCreditCard />,
      title: 'Payment Successful',
      desc: 'Your payment of $14.99 for Premium subscription was processed successfully',
      time: '1 week ago',
      unread: false
    }
  ];

  const filteredNotifications = activeTab === 'All' 
    ? notifications 
    : (activeTab === 'Unread' 
        ? notifications.filter(n => n.unread) 
        : (activeTab === 'Read' 
            ? notifications.filter(n => !n.unread).slice(0, 4) 
            : [])
      ); // Dummy filtering logic

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <div style={styles.headerLeft}>
          <div style={styles.bellIconWrapper}>
            <div style={styles.bellBadge}>2</div>
            <FaBell />
          </div>
          <div style={styles.headerTitleBox}>
            <h1 style={styles.headerTitle}>Notifications</h1>
            <p style={styles.headerSubtitle}>2 unread notifications</p>
          </div>
        </div>
        <button 
          style={styles.markReadBtn}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 50, 240, 0.25)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 50, 240, 0.15)'}
        >
          Mark All Read
        </button>
      </div>

      <div style={styles.tabsRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button 
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{...styles.tabBtn, ...(isActive ? styles.tabBtnActive : {})}}
            >
              {tab.label}
              <span style={{...styles.tabBadge, ...(isActive ? styles.tabBadgeActive : {})}}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      <div style={styles.notificationsList}>
        {filteredNotifications.map((notif) => {
          const isHovered = hoveredCard === notif.id;
          const isUnread = notif.unread;

          return (
            <div 
              key={notif.id} 
              style={{
                ...styles.card, 
                ...(isUnread ? styles.cardUnread : {}),
                ...(isHovered && !isUnread ? styles.cardHovered : {})
              }}
              onMouseEnter={() => setHoveredCard(notif.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.cardLeft}>
                <div style={{...styles.iconBox, ...(isUnread ? styles.iconBoxUnread : {})}}>
                  {notif.icon}
                </div>
                <div style={styles.contentBox}>
                  <div style={styles.notifTitle}>{notif.title}</div>
                  <div style={styles.notifDesc}>{notif.desc}</div>
                  <div style={styles.notifTime}>{notif.time}</div>
                </div>
              </div>

              <div style={styles.cardRight}>
                {isUnread ? (
                  <div style={styles.unreadIndicators}>
                    <div style={styles.unreadDot}></div>
                    <button style={styles.checkBtn}><FaCheck /></button>
                  </div>
                ) : (
                  <div style={{height: '24px'}}></div> /* spacing placeholder */
                )}
                <div style={styles.actionIcons}>
                  <FaTimes 
                    style={styles.actionIcon} 
                    onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#717380'}
                  />
                  <FaTrashAlt 
                    style={styles.actionIcon} 
                    onMouseOver={(e) => e.currentTarget.style.color = '#ff4d4d'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#717380'}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewerNotifications;
