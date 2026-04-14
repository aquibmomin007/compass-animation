import React from 'react';
import styles from './CompassMainContainer.module.scss';
import CompassArcGroup from './CompassArcGroup';
import CompassNeedleGroup from './CompassNeedleGroup';

const CompassMainContainer = ({ activeQuadrant, onCenterIconClick, isCenterMenuOpen }) => {
  return (
    <div className={styles.compassCircleContainer}>
      <CompassArcGroup activeQuadrant={activeQuadrant} isCenterMenuOpen={isCenterMenuOpen} />
      <CompassNeedleGroup
        activeQuadrant={activeQuadrant}
        onCenterIconClick={onCenterIconClick}
        isCenterMenuOpen={isCenterMenuOpen}
      />
    </div>
  );
};

export default CompassMainContainer;
