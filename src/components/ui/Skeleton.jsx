// Updated Skeleton.jsx
import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div 
      className={`animate-pulse bg-surface-dark-hover dark:bg-surface-dark-hover rounded-lg ${className}`}
      style={{ backgroundImage: 'linear-gradient(90deg, rgba(55, 65, 81, 0.3) 0%, rgba(75, 85, 99, 0.4) 50%, rgba(55, 65, 81, 0.3) 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}
    />
  );
};

export default Skeleton;