import React, { useState } from 'react';
import { FaStar, FaRegBookmark, FaPlay } from 'react-icons/fa';
import { MdLiveTv, MdTune } from 'react-icons/md';

const ViewerTVShows = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeGenre, setActiveGenre] = useState('All');

  const styles = {
    container: {
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
      padding: '40px 60px',
    },
    headerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '28px',
      fontWeight: '700',
      color: '#fdfdfd',
      margin: 0,
    },
    headerIcon: {
      color: '#7A32F0',
    },
    filterToggleBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: 'transparent',
      border: '1px solid #1f2129',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    genresRow: {
      display: 'flex',
      gap: '12px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    genreBtn: {
      padding: '10px 24px',
      borderRadius: '8px',
      backgroundColor: '#151720',
      color: '#a0a3b1',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    genreBtnActive: {
      backgroundColor: '#7A32F0',
      color: '#fff',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      borderTop: '1px solid #1f2129',
      paddingTop: '30px',
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
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
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
      aspectRatio: '2/3',
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
    seasonBadge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#151720',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'block',
      fontSize: '11px',
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

  const genres = ['All', 'Drama', 'Sci-Fi', 'Action', 'Comedy', 'Thriller', 'Documentary', 'Fantasy'];

  const results = [
    { id: 1, title: 'Breaking Bad', genre: 'Drama', seasons: '5 Seasons', year: '2008', rating: '9.5', img: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
    { id: 2, title: 'Game of Thrones', genre: 'Fantasy', seasons: '8 Seasons', year: '2011', rating: '9.2', img: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg' },
    { id: 3, title: 'Stranger Things', genre: 'Sci-Fi', seasons: '4 Seasons', year: '2016', rating: '8.6', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=500&auto=format&fit=crop' },
    { id: 4, title: 'The Mandalorian', genre: 'Action', seasons: '3 Seasons', year: '2019', rating: '8.7', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop' },
    { id: 5, title: 'The Last of Us', genre: 'Drama', seasons: '1 Season', year: '2023', rating: '8.8', img: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg' },
    { id: 6, title: 'Succession', genre: 'Drama', seasons: '4 Seasons', year: '2018', rating: '8.9', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop' },
    { id: 7, title: 'The Boys', genre: 'Action', seasons: '3 Seasons', year: '2019', rating: '8.7', img: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500&auto=format&fit=crop' },
    { id: 8, title: 'Peaky Blinders', genre: 'Drama', seasons: '6 Seasons', year: '2013', rating: '8.8', img: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg' },
  ];

  const filteredResults = activeGenre === 'All' 
    ? results 
    : results.filter(item => item.genre === activeGenre);

  const currentSectionTitle = activeGenre === 'All' ? 'All TV Shows' : `${activeGenre} Shows`;

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <h1 style={styles.headerTitle}>
          <MdLiveTv style={styles.headerIcon} /> TV Shows
        </h1>
        <button style={styles.filterToggleBtn}>
          <MdTune style={{ fontSize: '18px' }} /> Filters
        </button>
      </div>

      <div style={styles.genresRow}>
        {genres.map((genre) => (
          <button 
            key={genre} 
            onClick={() => setActiveGenre(genre)}
            style={{...styles.genreBtn, ...(activeGenre === genre ? styles.genreBtnActive : {})}}
          >
            {genre}
          </button>
        ))}
      </div>

      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>{currentSectionTitle}</h2>
        <span style={styles.resultsCount}>{filteredResults.length} shows</span>
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
                <div style={styles.seasonBadge}>
                  {item.seasons}
                </div>
                {isHovered && (
                  <div style={styles.bookmarkIcon}>
                    <FaRegBookmark style={{ fontSize: '12px', color: '#fff' }} />
                  </div>
                )}
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
          Load More Shows
        </button>
      </div>
    </div>
  );
};

export default ViewerTVShows;

