import React from 'react';
import styles from './CompassMainContainer.module.scss';
import CompassArcGroup from './CompassArcGroup';
import CompassNeedleGroup from './CompassNeedleGroup';

const CompassMainContainer = ({ activeQuadrant }) => {
  return (
    <div className={styles.compassCircleContainer}>
      <CompassArcGroup activeQuadrant={activeQuadrant} />
      <CompassNeedleGroup activeQuadrant={activeQuadrant} />
    </div>
  );
};

export default CompassMainContainer;
