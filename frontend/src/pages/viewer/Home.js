import React from 'react';
import { FaPlay, FaPlus, FaCheckCircle, FaStar } from 'react-icons/fa';

const ViewerHome = () => {
  const styles = {
    container: {
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
      paddingBottom: '50px',
    },
    heroSection: {
      position: 'relative',
      height: '70vh',
      backgroundImage: `linear-gradient(to right, #0a0d14 10%, rgba(10,13,20,0.4) 100%), url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop')`, // Dark Knight / Gotham Background Replacement
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '60px',
    },
    heroContent: {
      maxWidth: '600px',
      zIndex: 2,
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#a0a3b1',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '15px',
    },
    star: {
      color: '#7A32F0',
      marginRight: '5px',
    },
    title: {
      fontSize: '56px',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '20px',
      color: '#fdfdfd',
    },
    description: {
      fontSize: '16px',
      color: '#d1d2d8',
      marginBottom: '35px',
      lineHeight: '1.5',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
    },
    btnPrimary: {
      backgroundColor: '#fff',
      color: '#000',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    btnSecondary: {
      backgroundColor: 'rgba(50, 40, 80, 0.7)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      border: '1px solid rgba(122, 50, 240, 0.3)',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    premiumBanner: {
      margin: '-40px 60px 40px',
      position: 'relative',
      zIndex: 10,
      backgroundColor: '#231e3d',
      borderRadius: '12px',
      padding: '24px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid rgba(122,50,240,0.3)',
    },
    premiumLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    premiumIconBox: {
      width: '45px',
      height: '45px',
      backgroundColor: '#7A32F0',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    premiumTitleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '700',
      fontSize: '18px',
      marginBottom: '5px',
    },
    premiumFeatures: {
      color: '#a0a3b1',
      fontSize: '13px',
      fontWeight: '500',
      marginBottom: '5px',
    },
    premiumDate: {
      color: '#717380',
      fontSize: '12px',
    },
    btnManage: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #483d6b',
      padding: '10px 24px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    section: {
      padding: '0 60px 50px',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      margin: 0,
    },
    viewAll: {
      marginLeft: 'auto',
      color: '#7A32F0',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    row: {
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
      objectPosition: 'top',
    },
    progressWrap: {
      height: '4px',
      backgroundColor: '#1f2129',
      marginTop: '-14px',
      marginBottom: '10px',
      position: 'relative',
      borderRadius: '0 0 8px 8px',
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#7A32F0',
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
      minWidth: '200px',
      cursor: 'pointer',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    portraitImg: {
      width: '100%',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.3s ease',
      objectPosition: 'top',
    },
    rankBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#7A32F0',
      color: '#fff',
      fontWeight: '700',
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: 10,
    },
    portraitTitlePanel: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '40px 15px 15px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
      fontSize: '16px',
      fontWeight: '700',
    }
  };

  const continueWatching = [
    { title: 'The Mandalorian', meta: 'S3:E1 • 65% watched', progress: 65, img: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRh9zCGIGub462icKU.jpg' },
    { title: 'Breaking Bad', meta: 'S5:E14 • 42% watched', progress: 42, img: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
    { title: 'Inception', meta: 'Movie • 88% watched', progress: 88, img: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg' },
    { title: 'Stranger Things', meta: 'S4:E1 • 15% watched', progress: 15, img: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8SlgwAWme.jpg' },
  ];

  const trending = [
    { title: 'Avengers: Endgame', rank: 1, img: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
    { title: 'Dune', rank: 2, img: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg' },
    { title: 'The Last of Us', rank: 3, img: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg' },
    { title: 'Spider-Man', rank: 4, img: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg' },
  ];

  const recommended = [
    { title: 'The Dark Knight', meta: 'Action', img: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { title: 'Interstellar', meta: 'Sci-Fi', img: 'https://image.tmdb.org/t/p/w500/gEU2QlsEOWpN5zjY8NdXOtP1E0.jpg' },
    { title: 'Parasite', meta: 'Thriller', img: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
    { title: 'Succession', meta: 'Drama', img: 'https://image.tmdb.org/t/p/w500/7rrym1tvwHW2I8P30BmsZ59XQ1w.jpg' },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.meta}>
            <span><FaStar style={styles.star} /> 9.0</span>
            <span>•</span>
            <span>152 mins</span>
            <span>•</span>
            <span>Action</span>
            <span>•</span>
            <span>Thriller</span>
          </div>
          <h1 style={styles.title}>The Dark Knight</h1>
          <p style={styles.description}>When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.</p>
          <div style={styles.buttonContainer}>
            <button style={styles.btnPrimary}><FaPlay /> Play Now</button>
            <button style={styles.btnSecondary}><FaPlus /> My List</button>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div style={styles.premiumBanner}>
        <div style={styles.premiumLeft}>
          <div style={styles.premiumIconBox}>
            <img src="https://cdn-icons-png.flaticon.com/512/5162/5162232.png" alt="Crown" style={{width: '24px', filter: 'invert(1)'}} />
          </div>
          <div>
            <div style={styles.premiumTitleRow}>
              Premium Subscription <FaCheckCircle style={{ color: '#7A32F0', fontSize: '14px' }} />
            </div>
            <div style={styles.premiumFeatures}>Unlimited streaming • 4K Quality • Download & Watch Offline</div>
            <div style={styles.premiumDate}>Next billing: April 10, 2026 • $14.99/month</div>
          </div>
        </div>
        <button style={styles.btnManage}>Manage Plan</button>
      </div>

      {/* Continue Watching Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Continue Watching</h2>
          <span style={styles.viewAll}>View All {'>'}</span>
        </div>
        <div style={styles.row}>
          {continueWatching.map((item, idx) => (
            <div key={idx} style={styles.cardLandscape}>
              <img src={item.img} alt={item.title} style={styles.landscapeImg} />
              <div style={styles.progressWrap}>
                <div style={{ ...styles.progressBar, width: `${item.progress}%` }}></div>
              </div>
              <div style={styles.cardTitle}>{item.title}</div>
              <div style={styles.cardMeta}>{item.meta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Trending Now</h2>
        </div>
        <div style={styles.row}>
          {trending.map((item, idx) => (
            <div style={styles.cardPortrait} key={idx}>
              <div style={styles.rankBadge}>#{item.rank}</div>
              <img src={item.img} alt={item.title} style={styles.portraitImg} />
              <div style={styles.portraitTitlePanel}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Recommended For You</h2>
        </div>
        <div style={styles.row}>
          {recommended.map((item, idx) => (
            <div key={idx} style={styles.cardLandscape}>
              <img src={item.img} alt={item.title} style={styles.landscapeImg} />
              <div style={styles.cardTitle}>{item.title}</div>
              <div style={styles.cardMeta}>{item.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewerHome;
