import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import CompassSvg from './CompassSvg';
import styles from './CompassNeedleGroup.module.scss';

const NEEDLE_ANGLE = {
  topLeft: -45,
  topRight: 45,
  bottomLeft: -135,
  bottomRight: 135,
};

const CompassNeedleGroup = ({ activeQuadrant, onCenterIconClick, isCenterMenuOpen }) => {
  const rotation = NEEDLE_ANGLE[activeQuadrant] ?? 0;
  const needleUrl = isCenterMenuOpen ? '/compass/Needle-grey.svg' : '/compass/Needle.svg';
  const centerIconUrl = isCenterMenuOpen
    ? '/compass/center-icon-clicked.svg'
    : '/compass/center-icon.svg';

  return (
    <div className={cn(styles.compassNeedleGroup, isCenterMenuOpen && styles.centerMenuOpen)}>
      {/* Needle */}
      <CompassSvg
        id="compass-needle"
        url={needleUrl}
        alt="needle"
        className={styles.compassNeedle}
        style={{ '--needle-rotation': `${rotation}deg` }}
      />

      <motion.button
        type="button"
        aria-label="Open center menu"
        className={cn(styles.compassCenterButton, isCenterMenuOpen && styles.compassCenterButtonOpen)}
        onClick={onCenterIconClick}
        animate={{ width: isCenterMenuOpen ? 96 : 40, height: isCenterMenuOpen ? 96 : 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.7 }}
      >
        <CompassSvg
          id="compass-center-icon"
          url={centerIconUrl}
          alt="center-icon"
          className={styles.compassCenterIcon}
        />
      </motion.button>
    </div>
  );
};

export default CompassNeedleGroup;
