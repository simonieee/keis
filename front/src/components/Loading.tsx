import React from 'react';
import LOADING from '@src/assets/loading.svg';
import { useLoading } from './LoadingManager';

const Loading = () => {
  /* Router */
  /* State */
  const { isLoading } = useLoading();
  /* Functions */
  /* Hooks */
  /* Render */
  return (
    isLoading && (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          background: 'rgba(255, 255, 255, 0.9)',
          zIndex: '9999',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={LOADING} alt="loading" />
      </div>
    )
  );
};

export default Loading;
