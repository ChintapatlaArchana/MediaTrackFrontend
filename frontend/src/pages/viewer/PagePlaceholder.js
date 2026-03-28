import React from 'react';

const PagePlaceholder = ({ title }) => {
  return (
    <div style={{
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Inter", sans-serif',
      fontSize: '24px',
      fontWeight: '600'
    }}>
      {title} Page - Coming Soon
    </div>
  );
};

export default PagePlaceholder;
