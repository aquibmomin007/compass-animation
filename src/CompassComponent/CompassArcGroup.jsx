import React from 'react';
import CompassSvg from './CompassSvg';

const arcSize = 189;

const ARC_CONFIG = {
  topLeft: {
    id: 'top-left-arc',
    redUrl: '/compass/arc-top-left.svg',
    greyUrl: '/compass/arc-top-left-grey.svg',
    style: { position: 'absolute', top: 0, left: 0, width: arcSize, height: arcSize, zIndex: 10 },
  },
  topRight: {
    id: 'top-right-arc',
    redUrl: '/compass/arc-top-right.svg',
    greyUrl: '/compass/arc-top-right-grey.svg',
    style: { position: 'absolute', top: 0, right: 0, width: arcSize, height: arcSize, zIndex: 10 },
  },
  bottomLeft: {
    id: 'bottom-left-arc',
    redUrl: '/compass/arc-bottom-left.svg',
    greyUrl: '/compass/arc-bottom-left-grey.svg',
    style: { position: 'absolute', bottom: 0, left: 0, width: arcSize, height: arcSize, zIndex: 10 },
  },
  bottomRight: {
    id: 'bottom-right-arc',
    redUrl: '/compass/arc-bottom-right.svg',
    greyUrl: '/compass/arc-bottom-right-grey.svg',
    style: { position: 'absolute', bottom: 0, right: 0, width: arcSize, height: arcSize, zIndex: 10 },
  },
};

const CompassArcGroup = ({ activeQuadrant, isCenterMenuOpen }) => {
  const orderedKeys = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

  return (
    <div className="CompassArcGroup">
      {orderedKeys.map((key) => {
        const arc = ARC_CONFIG[key];
        const isActive = activeQuadrant === key;
        const showGrey = Boolean(activeQuadrant);
        const arcUrl = isCenterMenuOpen
          ? arc.greyUrl
          : showGrey
            ? (isActive ? arc.redUrl : arc.greyUrl)
            : arc.redUrl;

        return (
          <CompassSvg
            key={arc.id}
            id={arc.id}
            url={arcUrl}
            alt={arc.id}
            style={{
              ...arc.style,
              zIndex: isActive ? 11 : 10,
              transition: 'opacity 260ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        );
      })}
    </div>
  );
};

export default CompassArcGroup;
