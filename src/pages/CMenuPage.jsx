import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/CompassAnimation.css';

const CX = 216, CY = 216, R = 200;

const ARC_SEGMENTS = [
  [-85, -5],
  [5, 85],
  [95, 175],
  [185, 265],
];

function arcPath(startDeg, endDeg) {
  const toRad = (d) => (d * Math.PI) / 180;
  const x1 = (CX + R * Math.cos(toRad(startDeg))).toFixed(3);
  const y1 = (CY + R * Math.sin(toRad(startDeg))).toFixed(3);
  const x2 = (CX + R * Math.cos(toRad(endDeg))).toFixed(3);
  const y2 = (CY + R * Math.sin(toRad(endDeg))).toFixed(3);
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
}

export default function CMenuPage() {
  const [expanded, setExpanded] = useState(null);
  // Map expanded block to needle angle and arc index
  const needleAngles = {
    vorsorgen: -45, // top left
    sparen: 45,     // top right
    bezahlen: -135, // bottom left
    finanzieren: 135 // bottom right
  };
  // Arc index mapping to match visual quadrant
  const arcIndex = {
    vorsorgen: 3,      // top left
    sparen: 0,         // top right
    bezahlen: 2,       // bottom left
    finanzieren: 1     // bottom right
  };
  // Content for each block
  const blockContent = {
    vorsorgen: (
      <div style={{ paddingLeft: 20 }}>
        <div style={{ color: '#060606', fontSize: 38, fontWeight: 500, marginBottom: 8 }}>Vorsorgen</div>
        <div style={{ fontSize: 22, color: '#444', marginBottom: 2 }}>3. Säule</div>
        <div style={{ fontSize: 22, color: '#444' }}>Finanzplan</div>
      </div>
    ),
    sparen: (
      <div style={{ paddingRight: 20 }}>
        <div style={{ color: '#222', fontSize: 38, fontWeight: 500, marginBottom: 8, textAlign: 'right' }}>Sparen & Anlegen</div>
        <div style={{ fontSize: 22, color: '#444', textAlign: 'right', marginBottom: 2 }}>Beratung</div>
        <div style={{ fontSize: 22, color: '#444', textAlign: 'right' }}>Review</div>
      </div>
    ),
    bezahlen: (
      <div style={{ paddingLeft: 20 }}>
        <div style={{ fontSize: 22, color: '#444', marginBottom: 2 }}>Konten</div>
        <div style={{ fontSize: 22, color: '#444', marginBottom: 2 }}>Karten</div>
        <div style={{ fontSize: 22, color: '#444' }}>Spezialangebote</div>
        <div style={{ color: '#222', fontSize: 38, fontWeight: 500, marginBottom: 8 }}>Bezahlen</div>
      </div>
    ),
    finanzieren: (
      <div style={{ paddingRight: 20 }}>
        <div style={{ fontSize: 22, color: '#444', textAlign: 'right', marginBottom: 2 }}>Beratung</div>
        <div style={{ color: '#222',  fontSize: 38, fontWeight: 500, marginBottom: 8, textAlign: 'right' }}>Finanzieren</div>
      </div>
    ),
  };
  // Animation settings
  const blockVariants = {
    initial: { width: 434, height: 372, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    expanded: { width: 700, height: 360, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', zIndex: 10 },
  };
  const textVariants = {
    initial: { opacity: 1 },
    expanded: { opacity: 0 },
  };
  const contentVariants = {
    initial: { opacity: 0, y: 30 },
    expanded: { opacity: 1, y: 0 },
  };
  return (
    <div className="c-menu-container" style={{ minHeight: '100vh', width: '100vw', position: 'relative', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <div className="nav-bar" style={{ width: '100%', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', padding: '0 32px', height: 64 }}>
        <h1 style={{ fontSize: 28, color: '#b00', margin: 0, fontWeight: 700, letterSpacing: 1 }}>C Menu</h1>
        <nav style={{ marginLeft: 32 }}>
          <a href="/" style={{ marginRight: 24, color: '#444', textDecoration: 'none', fontWeight: 500 }}>Home</a>
          <a href="/compass" style={{ marginRight: 24, color: '#444', textDecoration: 'none', fontWeight: 500 }}>Compass</a>
          <a href="/cmenu" style={{ color: '#b00', textDecoration: 'underline', fontWeight: 700 }}>C Menu</a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* 2x2 Grid of Section Blocks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '434px 434px',
          gridTemplateRows: '372px 372px',
          gap: '0px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Top Left Block */}
          <motion.div
            layout
            initial={false}
            animate={expanded === 'vorsorgen'
              ? { width: 700, height: 372, marginLeft: -266, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', background: '#fff', zIndex: 10 }
              : { width: 434, height: 372, marginLeft: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', background: 'transparent', zIndex: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ position: 'relative', overflow: 'visible', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === 'vorsorgen' ? null : 'vorsorgen')}
          >
            <div style={{ position: 'absolute', top: 24, left: 32, display: 'flex', alignItems: 'center', height: expanded === 'vorsorgen' ? 'calc(100% - 48px)' : 'auto' }}>
              {expanded === 'vorsorgen' && (
                <div style={{
                  width: 5,
                  height: '100%',
                  background: '#b00',
                  marginRight: 12,
                  transition: 'height 0.4s',
                  alignSelf: 'stretch',
                }} />
              )}
              <motion.p
                variants={textVariants}
                animate={expanded === 'vorsorgen' ? 'expanded' : 'initial'}
                style={{ margin: 0, fontSize: 28, color: '#222', fontWeight: 600, cursor: 'pointer' }}
              >Vorsorgen</motion.p>
            </div>
            <AnimatePresence>
              {expanded === 'vorsorgen' && (
                <motion.div
                  key="vorsorgen-content"
                  initial="initial"
                  animate="expanded"
                  exit="initial"
                  variants={contentVariants}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', top: 20, left: 32, width: 340, zIndex: 10 }}
                >
                  {blockContent.vorsorgen}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Top Right Block */}
          <motion.div
            layout
            initial={false}
            animate={expanded === 'sparen'
              ? { width: 700, height: 372, marginRight: -266, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', background: '#fff', zIndex: 10 }
              : { width: 434, height: 372, marginRight: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', background: 'transparent', zIndex: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ position: 'relative', overflow: 'visible', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === 'sparen' ? null : 'sparen')}
          >
            <div style={{ position: 'absolute', top: 24, right: 32, display: 'flex', alignItems: 'center', height: expanded === 'sparen' ? 'calc(100% - 48px)' : 'auto', flexDirection: 'row-reverse' }}>
              {expanded === 'sparen' && (
                <div style={{
                  width: 5,
                  height: '100%',
                  background: '#b00',
                  marginLeft: 12,
                  transition: 'height 0.4s',
                  alignSelf: 'stretch',
                }} />
              )}
              <motion.p
                variants={textVariants}
                animate={expanded === 'sparen' ? 'expanded' : 'initial'}
                style={{ margin: 0, fontSize: 28, color: '#222', fontWeight: 600, cursor: 'pointer', textAlign: 'right' }}
              >Sparen & Anlegen</motion.p>
            </div>
            <AnimatePresence>
              {expanded === 'sparen' && (
                <motion.div
                  key="sparen-content"
                  initial="initial"
                  animate="expanded"
                  exit="initial"
                  variants={contentVariants}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', top: 20, right: 32, width: 340, zIndex: 10 }}
                >
                  {blockContent.sparen}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Bottom Left Block */}
          <motion.div
            layout
            initial={false}
            animate={expanded === 'bezahlen'
              ? { width: 700, height: 372, marginLeft: -266, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', background: '#fff', zIndex: 10 }
              : { width: 434, height: 372, marginLeft: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', background: 'transparent', zIndex: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ position: 'relative', overflow: 'visible', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === 'bezahlen' ? null : 'bezahlen')}
          >
            <div style={{ position: 'absolute', bottom: 24, left: 32, display: 'flex', alignItems: 'center', height: expanded === 'bezahlen' ? 'calc(100% - 48px)' : 'auto' }}>
              {expanded === 'bezahlen' && (
                <div style={{
                  width: 5,
                  height: '100%',
                  background: '#b00',
                  marginRight: 12,
                  transition: 'height 0.4s',
                  alignSelf: 'stretch',
                }} />
              )}
              <motion.p
                variants={textVariants}
                animate={expanded === 'bezahlen' ? 'expanded' : 'initial'}
                style={{ margin: 0, fontSize: 28, color: '#222', fontWeight: 600, cursor: 'pointer', maxWidth: expanded === 'bezahlen' ? 636 : 370, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >Bezahlen</motion.p>
            </div>
            <AnimatePresence>
              {expanded === 'bezahlen' && (
                <motion.div
                  key="bezahlen-content"
                  initial="initial"
                  animate="expanded"
                  exit="initial"
                  variants={contentVariants}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', bottom: 10, left: 32, width: 340, zIndex: 10, background: 'transparent' }}
                >
                  {blockContent.bezahlen}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Bottom Right Block */}
          <motion.div
            layout
            initial={false}
            animate={expanded === 'finanzieren'
              ? { width: 700, height: 372, marginRight: -266, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', background: '#fff', zIndex: 10 }
              : { width: 434, height: 372, marginRight: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', background: 'transparent', zIndex: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ position: 'relative', overflow: 'visible', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === 'finanzieren' ? null : 'finanzieren')}
          >
            <div style={{ position: 'absolute', bottom: 24, right: 32, display: 'flex', alignItems: 'center', height: expanded === 'finanzieren' ? 'calc(100% - 48px)' : 'auto', flexDirection: 'row-reverse' }}>
              {expanded === 'finanzieren' && (
                <div style={{
                  width: 5,
                  height: '100%',
                  background: '#b00',
                  marginLeft: 12,
                  transition: 'height 0.4s',
                  alignSelf: 'stretch',
                }} />
              )}
              <motion.p
                variants={textVariants}
                animate={expanded === 'finanzieren' ? 'expanded' : 'initial'}
                style={{ margin: 0, fontSize: 28, color: '#222', fontWeight: 600, cursor: 'pointer', textAlign: 'right' }}
              >Finanzieren</motion.p>
            </div>
            <AnimatePresence>
              {expanded === 'finanzieren' && (
                <motion.div
                  key="finanzieren-content"
                  initial="initial"
                  animate="expanded"
                  exit="initial"
                  variants={contentVariants}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', bottom: 10, right: 32, width: 340, zIndex: 10 }}
                >
                  {blockContent.finanzieren}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {/* Overlay Compass SVG at Center */}
        <div
          className="needle-container"
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'auto', zIndex: 2, background: 'white', borderRadius: '50%' }}
          onClick={() => setExpanded(null)}
        >
          <svg viewBox="0 0 432 432" width={432} height={432} style={{ display: 'block' }}>
            {/* Arcs: only selected arc is red, others grey */}
            {ARC_SEGMENTS.map(([s, e], i) => (
              <motion.path
                key={i}
                d={arcPath(s, e)}
                fill="none"
                stroke={expanded == null ? "#e60000" : (arcIndex[expanded] === i ? "#e60000" : "#ddd")}
                strokeWidth="22"
                strokeLinecap="round"
                animate={{ stroke: expanded == null ? "#e60000" : (arcIndex[expanded] === i ? "#e60000" : "#ddd") }}
                transition={{ duration: 0.4 }}
              />
            ))}
            {/* Needle (animated rotation) */}
            <motion.g
              animate={{ rotate: expanded ? needleAngles[expanded] : 0 }}
              initial={false}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              {/* Red (north/up) half — rounded tip */}
              <path
                d={`M ${CX - 36},${CY}
                   Q ${CX - 18},${CY - 80} ${CX - 10},${CY - 100}
                   Q ${CX},${CY - 130} ${CX + 10},${CY - 100}
                   Q ${CX + 18},${CY - 80} ${CX + 36},${CY}
                   Z`}
                fill="#D42020"
              />
              {/* Black (south/down) half — rounded tip */}
              <path
                d={`M ${CX - 36},${CY}
                   Q ${CX - 18},${CY + 80} ${CX - 10},${CY + 100}
                   Q ${CX},${CY + 130} ${CX + 10},${CY + 100}
                   Q ${CX + 18},${CY + 80} ${CX + 36},${CY}
                   Z`}
                fill="#222"
              />
              {/* Center hub */}
              <circle cx={CX} cy={CY} r={20} fill="#fff" stroke="#bbb" strokeWidth="2" />
            </motion.g>
          </svg>
        </div>
      </div>
    </div>
  );
}
