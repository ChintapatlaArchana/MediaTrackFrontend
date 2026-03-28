import React, { useState } from 'react';
import { FaSearch, FaStar, FaHistory, FaRegBookmark, FaRegEye, FaPlay, FaRegStar } from 'react-icons/fa';
import { MdOutlineTrendingUp, MdOutlineAccessTime } from 'react-icons/md';

const ViewerSearch = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Trending');

  const styles = {
    container: {
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
      padding: '40px 60px',
    },
    header: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '30px',
      color: '#fdfdfd',
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '30px',
    },
    searchInput: {
      width: '100%',
      backgroundColor: '#151720',
      border: '1px solid #1f2129',
      borderRadius: '8px',
      padding: '16px 20px 16px 50px',
      color: '#fff',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    searchIcon: {
      position: 'absolute',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#717380',
      fontSize: '18px',
    },
    filtersRow: {
      display: 'flex',
      gap: '12px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    filterBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      borderRadius: '8px',
      backgroundColor: '#151720',
      color: '#a0a3b1',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    filterBtnActive: {
      backgroundColor: '#7A32F0',
      color: '#fff',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '700',
      margin: 0,
    },
    resultsCount: {
      fontSize: '13px',
      color: '#717380',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '24px',
      marginBottom: '50px',
    },
    card: {
      cursor: 'pointer',
      position: 'relative',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '320px',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '12px',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    imageHovered: {
      transform: 'scale(1.05)',
      filter: 'brightness(0.8)',
    },
    ratingBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(21, 23, 32, 0.8)',
      backdropFilter: 'blur(4px)',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px',
      fontWeight: '700',
      zIndex: 2,
    },
    bookmarkIcon: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(21, 23, 32, 0.8)',
      backdropFilter: 'blur(4px)',
      width: '28px',
      height: '28px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    playBtnContainer: {
      position: 'absolute',
      bottom: '15px',
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 2,
    },
    playBtn: {
      backgroundColor: '#fff',
      color: '#000',
      border: 'none',
      padding: '10px 0',
      width: '85%',
      borderRadius: '6px',
      fontWeight: '700',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    cardTitle: {
      fontSize: '15px',
      fontWeight: '700',
      marginBottom: '4px',
      color: '#fff',
    },
    cardTitleHovered: {
      color: '#7A32F0',
    },
    cardMeta: {
      fontSize: '12px',
      color: '#717380',
    },
    loadMoreContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    loadMoreBtn: {
      backgroundColor: 'rgba(122, 50, 240, 0.1)',
      color: '#fff',
      border: '1px solid #483d6b',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }
  };

  const filters = [
    { label: 'Trending', icon: <MdOutlineTrendingUp /> },
    { label: 'Popular', icon: <FaStar /> },
    { label: 'Recent', icon: <MdOutlineAccessTime /> },
    { label: 'Recommended', icon: <FaRegStar /> },
    { label: 'History', icon: <FaHistory /> },
    { label: 'Saved', icon: <FaRegBookmark /> },
    { label: 'Watch Later', icon: <MdOutlineAccessTime /> },
    { label: 'View Again', icon: <FaRegEye /> },
  ];

  const results = [
    { id: 1, title: 'Leo', genre: 'Tamil • Action', year: '2023', rating: '8.1', img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=500&auto=format&fit=crop' },
    { id: 2, title: 'RRR', genre: 'Telugu • Action', year: '2022', rating: '9.0', img: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg' },
    { id: 3, title: 'Jawan', genre: 'Hindi • Action', year: '2023', rating: '8.4', img: 'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg' },
    { id: 4, title: 'Interstellar', genre: 'English • Sci-Fi', year: '2014', rating: '8.6', img: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg' },
    { id: 5, title: 'Pushpa', genre: 'Telugu • Action', year: '2021', rating: '8.2', img: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=500&auto=format&fit=crop' },
    { id: 6, title: 'Dangal', genre: 'Hindi • Drama', year: '2016', rating: '8.8', img: 'https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg' },
  ];

  const filteredResults = activeFilter === 'Trending' 
    ? results 
    : results.filter(item => item.id % 2 === (activeFilter === 'Popular' ? 0 : 1)); // Dummy filtering logic to show changes

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Search & Discovery</h1>
      
      <div style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search movies, shows, documentaries..." 
          style={styles.searchInput}
        />
      </div>

      <div style={styles.filtersRow}>
        {filters.map((filter, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveFilter(filter.label)}
            style={{...styles.filterBtn, ...(activeFilter === filter.label ? styles.filterBtnActive : {})}}
          >
            {React.cloneElement(filter.icon, { style: { fontSize: '16px' } })}
            {filter.label}
          </button>
        ))}
      </div>

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>{activeFilter}</h2>
        <span style={styles.resultsCount}>{filteredResults.length} results</span>
      </div>

      <div style={styles.grid}>
        {filteredResults.map((item) => {
          const isHovered = hoveredCard === item.id;
          
          return (
            <div 
              key={item.id} 
              style={styles.card}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.imageContainer}>
                <div style={styles.ratingBadge}>
                  <FaStar style={{ color: '#7A32F0', fontSize: '10px' }} /> {item.rating}
                </div>
                <div style={styles.bookmarkIcon}>
                  <FaRegBookmark style={{ fontSize: '12px', color: '#fff' }} />
                </div>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{...styles.image, ...(isHovered ? styles.imageHovered : {})}} 
                />
                {isHovered && (
                  <div style={styles.playBtnContainer}>
                    <button style={styles.playBtn}>
                      <FaPlay style={{ fontSize: '12px' }} /> Play
                    </button>
                  </div>
                )}
              </div>
              <div style={{...styles.cardTitle, ...(isHovered ? styles.cardTitleHovered : {})}}>
                {item.title}
              </div>
              <div style={styles.cardMeta}>
                {item.genre} • {item.year} • <FaStar style={{color: '#7A32F0', fontSize: '10px', marginLeft: '2px'}}/> {item.rating}
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.loadMoreContainer}>
        <button 
          style={styles.loadMoreBtn}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 50, 240, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(122, 50, 240, 0.1)'}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default ViewerSearch;

