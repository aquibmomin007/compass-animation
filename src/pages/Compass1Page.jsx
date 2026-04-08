import React from 'react';
import CompassComponentWrapper from '../CompassComponent/CompassComponentWrapper';

const Compass1Page = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#bdbdbd', width: '100%' }}>
      <div
        style={{
          width: '100%',
          background: '#ffffff',
          borderBottom: '1px solid #e6e6e6',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          height: 64,
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: 28, color: '#b00', margin: 0, fontWeight: 700, letterSpacing: 1 }}>
          Compass 1
        </h1>
        <nav style={{ marginLeft: 32 }}>
          <a href="/" style={{ marginRight: 24, color: '#444', textDecoration: 'none', fontWeight: 500 }}>
            Home
          </a>
          <a href="/compass" style={{ marginRight: 24, color: '#444', textDecoration: 'none', fontWeight: 500 }}>
            Compass
          </a>
          <a href="/compass1" style={{ marginRight: 24, color: '#b00', textDecoration: 'underline', fontWeight: 700 }}>
            Compass 1
          </a>
          <a href="/cmenu" style={{ color: '#444', textDecoration: 'none', fontWeight: 500 }}>
            C Menu
          </a>
        </nav>
      </div>

      <div
        style={{
          height: 'calc(100vh - 64px)',
          width: '100%',
          padding: '32px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2d2d2d',
            position: 'relative',
          }}
        >
          <CompassComponentWrapper />
        </div>
      </div>
    </div>
  );
};

export default Compass1Page;
