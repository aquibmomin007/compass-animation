import React, { useEffect, useState } from 'react';
import style from './CompassComponentWrapper.module.scss';
import CompassItemContainer from './CompassItemContainer';
import CompassMainContainer from './CompassMainContainer';

const DCS = null;

const CompassComponentWrapper = () => {
  const [activeQuadrant, setActiveQuadrant] = useState(DCS);

  const isDCS = activeQuadrant === DCS;
  const isECS = !isDCS;

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveQuadrant(DCS);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={style.compassWrapper} data-compass-state={isDCS ? 'DCS' : 'ECS'} data-is-ecs={isECS}>
      <CompassItemContainer activeQuadrant={activeQuadrant} onQuadrantClick={setActiveQuadrant} />
      <CompassMainContainer activeQuadrant={activeQuadrant} />
    </div>
  );
};

export default CompassComponentWrapper;
