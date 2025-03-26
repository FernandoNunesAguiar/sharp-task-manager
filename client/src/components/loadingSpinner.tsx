import React from 'react';

const LoadingSpinner = () => (
  <div className="absolute z-50 h-screen w-screen bg-black opacity-40 flex items-center justify-center place-content-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-500"></div>
  </div>
);

export default LoadingSpinner;