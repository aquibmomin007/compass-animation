import React from 'react';
import CompassSvg from './CompassSvg';
import styles from './CompassNeedleGroup.module.scss';

const NEEDLE_ANGLE = {
  topLeft: -45,
  topRight: 45,
  bottomLeft: -135,
  bottomRight: 135,
};

const CompassNeedleGroup = ({ activeQuadrant }) => {
  const rotation = NEEDLE_ANGLE[activeQuadrant] ?? 0;

  return (
    <div className="CompassNeedleGroup">
      {/* Needle */}
      <CompassSvg
        id="compass-needle"
        url="/compass/Needle.svg"
        alt="needle"
        className={styles.compassNeedle}
        style={{ '--needle-rotation': `${rotation}deg` }}
      />

      {/* Center Icon */}
      <CompassSvg
        id="compass-center-icon"
        url="/compass/center-icon.svg"
        alt="center-icon"
        className={styles.compassCenterIcon}
      />
    </div>
  );
};

export default CompassNeedleGroup;
