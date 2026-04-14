import React from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './CompassItemContainer.module.scss';

const CompassItemContainer = ({ activeQuadrant, onQuadrantClick, isCenterMenuOpen }) => {
  const DCS = null;

  const handleLabelClick = (quadrant, event) => {
    if (isCenterMenuOpen) {
      return;
    }
    event.stopPropagation();
    onQuadrantClick(quadrant);
  };

  const handleExpandedTitleClick = (event) => {
    event.stopPropagation();
    onQuadrantClick(DCS);
  };

  const detailContent = {
    topLeft: {
      title: 'Vorsorgen',
      items: ['3. Saule', 'Finanzplan'],
    },
    topRight: {
      title: 'Sparen & Anlegen',
      items: ['Beratung', 'Review'],
    },
    bottomLeft: {
      title: 'Bezahlen',
      items: ['Konten', 'Karten'],
    },
    bottomRight: {
      title: 'Finanzieren',
      items: ['Beratung'],
    },
  };

  const textVariants = {
    initial: { opacity: 1 },
    expanded: { opacity: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 30 },
    expanded: { opacity: 1, y: 0 },
  };

  const renderDetailBlock = (quadrant, label, align) => {
    const isExpanded = activeQuadrant === quadrant;
    const isRightAligned = align === 'right';
    const isBottomAligned = quadrant === 'bottomLeft' || quadrant === 'bottomRight';

    return (
      <>
        <div className={cn(styles.itemDetails, styles[`itemDetails${align === 'right' ? 'Right' : 'Left'}`])}>
          <motion.p
            className={cn(
              styles.itemTitle,
              activeQuadrant && !isExpanded && styles.itemTitleInactiveEcs
            )}
            variants={textVariants}
            animate={isExpanded ? 'expanded' : 'initial'}
            onClick={(event) => handleLabelClick(quadrant, event)}
          >
            {label}
          </motion.p>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key={`${quadrant}-content`}
              initial="initial"
              animate="expanded"
              exit="initial"
              variants={contentVariants}
              transition={{ duration: 0.4 }}
              className={cn(styles.itemDetailsExpandedContent, isRightAligned ? styles.expandedRight : styles.expandedLeft)}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={cn(styles.expandedTextBlock, isBottomAligned && styles.expandedTextBlockBottom)}>
                {isBottomAligned ? (
                  <>
                    <div className={styles.expandedSubItemWrapper}>
                      {detailContent[quadrant].items.map((item) => (
                        <div key={item} className={styles.expandedSubItem}>{item}</div>
                      ))}
                    </div>
                    <div className={styles.expandedTitle} onClick={handleExpandedTitleClick}>{detailContent[quadrant].title}</div>
                  </>
                ) : (
                  <>
                    <div className={styles.expandedTitle} onClick={handleExpandedTitleClick}>{detailContent[quadrant].title}</div>
                    <div className={styles.expandedSubItemWrapper}>
                      {detailContent[quadrant].items.map((item) => (
                        <div key={item} className={styles.expandedSubItem}>{item}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <div className={cn(styles.compassItemWrapper, isCenterMenuOpen && styles.centerMenuOpen)}>
      <motion.div
        layout
        initial={false}
        animate={
          activeQuadrant === 'topLeft'
            ? { width: 780, marginLeft: -340, zIndex: 40 }
            : { width: 440, marginLeft: 0, zIndex: 1 }
        }
        transition={{ type: 'spring', stiffness: 100, damping: 12, overshoot: 8 }}
        className={cn(
          styles.compassItem,
          styles.compassItemTopLeft,
          activeQuadrant === 'topLeft' && styles.compassItemActive
        )}
      >
        {renderDetailBlock('topLeft', 'Vorsorgen', 'left')}
      </motion.div>

      <motion.div
        layout
        initial={false}
        animate={
          activeQuadrant === 'topRight'
            ? { width: 780, marginRight: -340, zIndex: 40 }
            : { width: 440, marginRight: 0, zIndex: 1 }
        }
        transition={{ type: 'spring', stiffness: 100, damping: 12, overshoot: 8 }}
        className={cn(
          styles.compassItem,
          styles.compassItemTopRight,
          activeQuadrant === 'topRight' && styles.compassItemActive
        )}
      >
        {renderDetailBlock('topRight', 'Sparen & Anlegen', 'right')}
      </motion.div>

      <motion.div
        layout
        initial={false}
        animate={
          activeQuadrant === 'bottomLeft'
            ? { width: 780, marginLeft: -340, zIndex: 40 }
            : { width: 440, marginLeft: 0, zIndex: 1 }
        }
        transition={{ type: 'spring', stiffness: 100, damping: 12, overshoot: 8 }}
        className={cn(
          styles.compassItem,
          styles.compassItemBottomLeft,
          activeQuadrant === 'bottomLeft' && styles.compassItemActive
        )}
      >
        {renderDetailBlock('bottomLeft', 'Bezahlen', 'left')}
      </motion.div>

      <motion.div
        layout
        initial={false}
        animate={
          activeQuadrant === 'bottomRight'
            ? { width: 780, marginRight: -340, zIndex: 40 }
            : { width: 440, marginRight: 0, zIndex: 1 }
        }
        transition={{ type: 'spring', stiffness: 100, damping: 12, overshoot: 8 }}
        className={cn(
          styles.compassItem,
          styles.compassItemBottomRight,
          activeQuadrant === 'bottomRight' && styles.compassItemActive
        )}
      >
        {renderDetailBlock('bottomRight', 'Finanzieren', 'right')}
      </motion.div>
    </div>
  );
};

export default CompassItemContainer;
