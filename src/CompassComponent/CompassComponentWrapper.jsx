import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import style from './CompassComponentWrapper.module.scss';
import CompassItemContainer from './CompassItemContainer';
import CompassMainContainer from './CompassMainContainer';

const DCS = null;
const CENTER_MENU_GROUP_1 = ['Ziele', 'Vermogen', 'Budget', 'Simulation'];
const CENTER_MENU_GROUP_2 = ['Kundensicht'];

const CompassComponentWrapper = () => {
  const [activeQuadrant, setActiveQuadrant] = useState(DCS);
  const [isCenterMenuOpen, setIsCenterMenuOpen] = useState(false);

  const isDCS = activeQuadrant === DCS;
  const isECS = !isDCS;

  const handleQuadrantClick = (quadrant) => {
    setIsCenterMenuOpen(false);
    setActiveQuadrant(quadrant);
  };

  const handleCenterIconClick = (event) => {
    event.stopPropagation();
    setActiveQuadrant(DCS);
    setIsCenterMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveQuadrant(DCS);
      setIsCenterMenuOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={style.compassWrapper} data-compass-state={isDCS ? 'DCS' : 'ECS'} data-is-ecs={isECS}>
      <CompassItemContainer
        activeQuadrant={activeQuadrant}
        onQuadrantClick={handleQuadrantClick}
        isCenterMenuOpen={isCenterMenuOpen}
      />

      <CompassMainContainer
        activeQuadrant={activeQuadrant}
        onCenterIconClick={handleCenterIconClick}
        isCenterMenuOpen={isCenterMenuOpen}
      />

      <AnimatePresence>
        {isCenterMenuOpen && (
          <motion.div
            className={style.centerMenu}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{
              y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={style.menuGroup1}>
              {CENTER_MENU_GROUP_1.map((item, index) => (
                <motion.div
                  key={item}
                  className={style.centerMenuItem}
                  initial={{ opacity: 0, x: (index - 1.5) * 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: (index - 1.5) * 6 }}
                  transition={{ delay: index * 0.018, duration: 0.2 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className={style.menuGroup2}>
              {CENTER_MENU_GROUP_2.map((item, index) => (
                <motion.div
                  key={item}
                  className={style.centerMenuItem}
                  initial={{ opacity: 0, x: (index + 2) * 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: (index + 2) * 6 }}
                  transition={{ delay: 4 * 0.018 + index * 0.018, duration: 0.2 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompassComponentWrapper;
