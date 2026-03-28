import React from 'react';
import { FaRegCalendarAlt, FaEnvelope, FaPen, FaCog, FaRegClock, FaRegEye, FaRegBookmark, FaShieldAlt } from 'react-icons/fa';

const ViewerMySpace = () => {
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
      marginBottom: '40px',
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#fdfdfd',
      margin: '0 0 8px 0',
    },
    headerSubtitle: {
      color: '#a0a3b1',
      fontSize: '14px',
      margin: 0,
    },
    profileCard: {
      backgroundColor: '#1c1533',
      borderRadius: '12px',
      padding: '30px',
      border: '1px solid rgba(122, 50, 240, 0.4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    profileLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    avatarWrapper: {
      position: 'relative',
    },
    avatarImg: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid rgba(122, 50, 240, 0.8)',
    },
    avatarBadge: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#7A32F0',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #1c1533',
    },
    profileNameRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '8px',
    },
    profileName: {
      fontSize: '24px',
      fontWeight: '700',
    },
    premiumBadge: {
      backgroundColor: 'rgba(122, 50, 240, 0.2)',
      color: '#b690f7',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    profileDetailRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#a0a3b1',
      fontSize: '13px',
      marginBottom: '6px',
    },
    profileButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    btnEdit: {
      backgroundColor: '#7A32F0',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    btnSettings: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #483d6b',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '40px',
    },
    statCard: {
      backgroundColor: '#12141c',
      border: '1px solid #1f2129',
      borderRadius: '12px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statIconBox: {
      width: '45px',
      height: '45px',
      backgroundColor: 'rgba(122, 50, 240, 0.1)',
      color: '#7A32F0',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      marginBottom: '16px',
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '6px',
    },
    statLabel: {
      fontSize: '13px',
      color: '#717380',
    },
    twoColsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '40px',
    },
    panelCard: {
      backgroundColor: '#12141c',
      border: '1px solid #1f2129',
      borderRadius: '12px',
      padding: '24px',
    },
    panelHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '24px',
    },
    panelRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: '1px solid #1f2129',
      fontSize: '14px',
    },
    panelRowLast: {
      borderBottom: 'none',
      marginBottom: '16px',
    },
    panelValue: {
      fontWeight: '600',
      color: '#fdfdfd',
    },
    linkValue: {
      color: '#7A32F0',
      fontWeight: '600',
      cursor: 'pointer',
    },
    activePill: {
      backgroundColor: 'rgba(122, 50, 240, 0.2)',
      color: '#b690f7',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
    },
    panelActionIcon: {
      color: '#717380',
      cursor: 'pointer',
    },
    manageBtn: {
      width: '100%',
      backgroundColor: 'rgba(122, 50, 240, 0.1)',
      color: '#b690f7',
      border: '1px solid #483d6b',
      padding: '12px 0',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      marginTop: '40px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    viewAllLink: {
      color: '#7A32F0',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    horizontalScroll: {
      display: 'flex',
      gap: '20px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
    },
    cardLandscape: {
      minWidth: '280px',
      cursor: 'pointer',
    },
    landscapeImg: {
      width: '100%',
      height: '160px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    cardTitle: {
      fontSize: '15px',
      fontWeight: '600',
      marginBottom: '4px',
    },
    cardMeta: {
      fontSize: '12px',
      color: '#717380',
    },
    cardPortrait: {
      minWidth: '220px',
      cursor: 'pointer',
    },
    portraitImg: {
      width: '100%',
      height: '320px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '10px',
    },
  };

  const recentlyWatched = [
    { title: 'The Dark Knight', meta: 'Movie • 2 hours ago', img: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg' },
    { title: 'Inception', meta: 'Movie • Yesterday', img: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg' },
    { title: 'Baahubali', meta: 'Telugu • 3 days ago', img: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Baahubali_The_Beginning_poster.jpg' },
    { title: 'Jailer', meta: 'Tamil • 1 week ago', img: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg' },
  ];

  const savedItems = [
    { title: 'Dangal', meta: 'Hindi', img: 'https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg' },
    { title: 'RRR', meta: 'Telugu', img: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg' },
    { title: 'Pathaan', meta: 'Hindi', img: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <h1 style={styles.headerTitle}>MySpace</h1>
        <p style={styles.headerSubtitle}>Your personalized viewer profile and activity</p>
      </div>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.profileLeft}>
          <div style={styles.avatarWrapper}>
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" alt="User Avatar" style={styles.avatarImg} />
            <div style={styles.avatarBadge}>
              <img src="https://cdn-icons-png.flaticon.com/512/5162/5162232.png" alt="Crown" style={{width: '12px', filter: 'invert(1)'}} />
            </div>
          </div>
          <div>
            <div style={styles.profileNameRow}>
              <div style={styles.profileName}>Alex Johnson</div>
              <div style={styles.premiumBadge}>
                <img src="https://cdn-icons-png.flaticon.com/512/5162/5162232.png" alt="Crown" style={{width: '12px', filter: 'opacity(0.8)'}} /> Premium
              </div>
            </div>
            <div style={styles.profileDetailRow}><FaEnvelope /> alex.johnson@email.com</div>
            <div style={styles.profileDetailRow}><FaRegCalendarAlt /> Member since January 15, 2024</div>
          </div>
        </div>
        <div style={styles.profileButtons}>
          <button style={styles.btnEdit}><FaPen /> Edit Profile</button>
          <button style={styles.btnSettings}><FaCog /></button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statIconBox}><FaRegClock /></div>
          <div style={styles.statNumber}>342</div>
          <div style={styles.statLabel}>Hours Watched</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIconBox}><FaRegEye /></div>
          <div style={styles.statNumber}>156</div>
          <div style={styles.statLabel}>Content Viewed</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIconBox}><FaRegBookmark /></div>
          <div style={styles.statNumber}>23</div>
          <div style={styles.statLabel}>Saved Items</div>
        </div>
      </div>

      {/* Two Columns Config */}
      <div style={styles.twoColsContainer}>
        <div style={styles.panelCard}>
          <div style={styles.panelHeader}>
            <img src="https://cdn-icons-png.flaticon.com/512/5162/5162232.png" alt="Crown" style={{width: '20px', filter: 'invert(1) drop-shadow(0 0 4px rgba(122,50,240,0.8))'}} />
            My Subscription
          </div>
          <div style={styles.panelRow}>
            <span style={{color: '#a0a3b1'}}>Current Plan</span>
            <span style={styles.panelValue}>Premium</span>
          </div>
          <div style={styles.panelRow}>
            <span style={{color: '#a0a3b1'}}>Price</span>
            <span style={styles.panelValue}>$14.99/month</span>
          </div>
          <div style={styles.panelRow}>
            <span style={{color: '#a0a3b1'}}>Next Billing</span>
            <span style={styles.linkValue}>April 10, 2026</span>
          </div>
          <div style={{...styles.panelRow, ...styles.panelRowLast}}>
            <span style={{color: '#a0a3b1'}}>Auto-Renew</span>
            <span style={styles.activePill}>Active</span>
          </div>
          <button style={styles.manageBtn}>Manage Subscription</button>
        </div>

        <div style={styles.panelCard}>
          <div style={styles.panelHeader}>
            <FaShieldAlt style={{color: '#7A32F0'}} />
            Security & Privacy
          </div>
          <div style={styles.panelRow}>
            <span style={styles.panelValue}>Change Password</span>
            <FaPen style={styles.panelActionIcon}/>
          </div>
          <div style={styles.panelRow}>
            <span style={styles.panelValue}>Two-Factor Authentication</span>
            <FaCog style={styles.panelActionIcon}/>
          </div>
          <div style={styles.panelRow}>
            <span style={styles.panelValue}>Privacy Settings</span>
            <FaCog style={styles.panelActionIcon}/>
          </div>
          <div style={{...styles.panelRow, ...styles.panelRowLast}}>
            <span style={styles.panelValue}>Download My Data</span>
            <FaCog style={styles.panelActionIcon}/>
          </div>
        </div>
      </div>

      {/* Recently Watched */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}><FaRegClock style={{color: '#7A32F0'}}/> Recently Watched</div>
        <div style={styles.viewAllLink}>View All</div>
      </div>
      <div style={styles.horizontalScroll}>
        {recentlyWatched.map((item, idx) => (
          <div key={idx} style={styles.cardLandscape}>
            <img src={item.img} alt={item.title} style={styles.landscapeImg} />
            <div style={styles.cardTitle}>{item.title}</div>
            <div style={styles.cardMeta}>{item.meta}</div>
          </div>
        ))}
      </div>

      {/* Saved Items */}
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitle}><FaRegBookmark style={{color: '#7A32F0'}}/> Saved Items</div>
        <div style={styles.viewAllLink}>View All</div>
      </div>
      <div style={styles.horizontalScroll}>
        {savedItems.map((item, idx) => (
          <div key={idx} style={styles.cardPortrait}>
            <img src={item.img} alt={item.title} style={styles.portraitImg} />
            <div style={styles.cardTitle}>{item.title}</div>
            <div style={styles.cardMeta}>{item.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewerMySpace;
