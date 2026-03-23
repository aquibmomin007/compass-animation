import { useState, useCallback } from "react";
import { motion, useAnimate } from "framer-motion";
import '../styles/CompassAnimation.css';

// ── Geometry ──────────────────────────────────────────────────────────────
const CX = 150, CY = 150, R = 120;
const toRad  = (d) => (d * Math.PI) / 180;
const CIRC = 2 * Math.PI * R;          // circumference
const ARC_LEN = (80 / 360) * CIRC;     // 80° arc dash
const GAP_LEN = (10 / 360) * CIRC;     // 10° gap
const DASH_OFFSET = (5 / 360) * CIRC;  // offset to align gaps at cardinals

function arcPath(startDeg, endDeg) {
  const x1 = (CX + R * Math.cos(toRad(startDeg))).toFixed(3);
  const y1 = (CY + R * Math.sin(toRad(startDeg))).toFixed(3);
  const x2 = (CX + R * Math.cos(toRad(endDeg))).toFixed(3);
  const y2 = (CY + R * Math.sin(toRad(endDeg))).toFixed(3);
  return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
}

const ARC_SEGMENTS = [
  [-85, -5],
  [  5,  85],
  [ 95, 175],
  [185, 265],
];

export default function CompassPage() {
  const [scope, anim] = useAnimate();
  const [currentStep, setCurrentStep] = useState(0);

  const resetAll = useCallback(async () => {
    const ids = ["#dot", "#nline", "#shadow", "#garc-l", "#garc-r",
      "#gy1", "#gy2", "#fring", "#needle", "#ctitle", "#rod-group", "#arc-group",
      "#arc0", "#arc1", "#arc2", "#arc3", "#vline0", "#vline1", "#vline2", "#vline3",
      "#split1", "#split2"];
    for (const id of ids) {
      try {
        await anim(id, { opacity: 0 }, { duration: 0.15 });
      } catch (_) { /* element may not exist yet */ }
    }
    // Reset specific properties
    try { await anim("#dot", { scale: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#nline", { pathLength: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#rod-group", { rotateY: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#arc-group", { scaleX: 0.01 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#shadow", { scaleX: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#fring", { pathLength: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#needle", { rotate: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#ctitle", { y: 10 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#gy1", { rotate: 45 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#gy2", { rotate: -45 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#split1", { rotate: 0, rx: R, ry: R }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#split2", { rotate: 0, rx: R, ry: R }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#arc-clip-rect", { height: 0 }, { duration: 0.01 }); } catch (_) {}
    try { await anim("#vline-clip-rect", { height: 0 }, { duration: 0.01 }); } catch (_) {}
    ARC_SEGMENTS.forEach((_, i) => {
      try { anim(`#arc${i}`, { pathLength: 0 }, { duration: 0.01 }); } catch (_) {}
    });
    setCurrentStep(0);
  }, [anim]);

  const goToStep = useCallback(async (step) => {
    // Reset everything first
    await resetAll();
    setCurrentStep(step);

    // Step 1: Show vertical line segments revealed top-to-bottom
    if (step >= 1) {
      // Show all vline segments instantly, then clip-reveal top to bottom
      for (let i = 0; i < 4; i++) {
        anim(`#vline${i}`, { opacity: 1 }, { duration: 0.01 });
      }
      await anim("#vline-clip-rect", { height: 2 * R + 20 }, {
        duration: 0.8, ease: [0.25, 0.1, 0.25, 1],
      });
    }

    // Step 2: Expand into full circle, fade out vertical line
    if (step >= 2) {
      // Show arcs and reveal clip
      anim("#arc-group", { opacity: 1 }, { duration: 0.01 });
      ARC_SEGMENTS.forEach((_, i) => {
        anim(`#arc${i}`, { pathLength: 1, opacity: 1 }, { duration: 0.01 });
      });
      anim("#arc-clip-rect", { height: 2 * R + 40 }, { duration: 0.01 });
      // Fade out the vertical line segments as circle expands
      for (let i = 0; i < 4; i++) {
        anim(`#vline${i}`, { opacity: 0 }, { duration: 0.3 });
      }
      // Expand arc-group from edge-on to full circle
      anim("#arc-group", { scaleX: 1 }, {
        duration: 1.5, ease: [0.4, 0, 0.2, 1],
      });
      await new Promise((r) => setTimeout(r, 1800));
    }

    // Step 3: Split circle into two tilted orbits
    if (step >= 3) {
      // Show both split circles (starting as overlapping full circles)
      anim("#split1", { opacity: 1 }, { duration: 0.01 });
      anim("#split2", { opacity: 1 }, { duration: 0.01 });
      // Fade out the arc-group
      anim("#arc-group", { opacity: 0 }, { duration: 0.3 });
      // Animate split1 to tilt +50° and flatten
      anim("#split1", { rotate: 50, ry: R * 0.3 }, {
        duration: 1.4, ease: [0.4, 0, 0.2, 1],
      });
      // Animate split2 to tilt -50° and flatten
      await anim("#split2", { rotate: -50, ry: R * 0.3 }, {
        duration: 1.4, ease: [0.4, 0, 0.2, 1],
      });
    }

    // Step 4: Gyroscope / calibration sweep
    if (step >= 4) {
      anim("#gy1", { opacity: 0.72 }, { duration: 0.22 });
      await new Promise((r) => setTimeout(r, 90));
      anim("#gy2", { opacity: 0.72 }, { duration: 0.22 });
      anim("#gy1", { rotate: 45 + 360 }, { duration: 1.18, ease: [0.4, 0, 0.2, 1] });
      await anim("#gy2", { rotate: -45 - 360 }, { duration: 1.18, ease: [0.4, 0, 0.2, 1] });
      anim("#gy1", { opacity: 0 }, { duration: 0.32 });
      await anim("#gy2", { opacity: 0 }, { duration: 0.32 });
    }

    // Step 5: Full ring flash
    if (step >= 5) {
      await anim("#fring", { opacity: 1, pathLength: 1 }, { duration: 0.22, ease: "easeOut" });
      await new Promise((r) => setTimeout(r, 195));
      await anim("#fring", { opacity: 0 }, { duration: 0.22 });
    }

    // Step 6: Needle locks to north with oscillation
    if (step >= 6) {
      anim("#dot", { opacity: 0 }, { duration: 0.18 });
      anim("#nline", { opacity: 0 }, { duration: 0.18 });
      anim("#shadow", { opacity: 0 }, { duration: 0.18 });
      await new Promise((r) => setTimeout(r, 150));
      await anim("#needle", { opacity: 1 }, { duration: 0.08 });
      await anim("#needle",
        { rotate: [112, -38, 19, -9, 4, -1, 0] },
        { duration: 1.05, ease: "easeOut" }
      );
    }

    // Step 7: Label fades in
    if (step >= 7) {
      await anim("#ctitle", { opacity: 1, y: 0 }, { duration: 0.55, ease: "easeOut" });
    }
  }, [anim, resetAll]);

  return (
    <div className="compass-container">
      <div className="nav-bar">
        <h1>Compass Animation</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/compass" className="active">Compass</a>
        </nav>
      </div>

      <div className="step-controls">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <button
            key={step}
            onClick={() => goToStep(step)}
            className={`control-btn ${currentStep === step ? 'active-step' : ''}`}
          >
            Step {step}
          </button>
        ))}
        <button onClick={resetAll} className="control-btn reset-btn">
          Reset
        </button>
      </div>

      <div className="animation-wrapper" style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
        {/* Film grain overlay */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            opacity: 0.045, pointerEvents: "none",
          }}
        >
          <filter id="fgrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#fgrain)" />
        </svg>

        <div ref={scope} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg viewBox="0 0 300 300" width={300} height={300} style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#8B1A1A" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#8B1A1A" stopOpacity="0"    />
              </radialGradient>
              <filter id="ringGlow" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="needleGlow" x="-35%" y="-25%" width="170%" height="150%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* 3D depth gradients for split disks */}
              <linearGradient id="disk1Grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#E83030" stopOpacity="1" />
                <stop offset="40%"  stopColor="#D42020" stopOpacity="0.9" />
                <stop offset="70%"  stopColor="#8B1A1A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6B1010" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="disk2Grad" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#E83030" stopOpacity="1" />
                <stop offset="40%"  stopColor="#C01818" stopOpacity="0.9" />
                <stop offset="70%"  stopColor="#7A1212" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#5A0A0A" stopOpacity="0.15" />
              </linearGradient>
              <filter id="diskShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="shadow" />
                <feColorMatrix in="shadow" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0" result="colorShadow" />
                <feMerge>
                  <feMergeNode in="colorShadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="arc-reveal">
                <motion.rect id="arc-clip-rect" x="0" y={CY - R - 20} width="300" height="0" />
              </clipPath>
              <clipPath id="vline-reveal">
                <motion.rect id="vline-clip-rect" x="0" y={CY - R - 10} width="300" height="0" />
              </clipPath>
            </defs>

            {/* Ambient glow disc */}
            <circle cx={CX} cy={CY} r={R + 32} fill="url(#ambientGlow)" />

            {/* Shadow ellipse at needle base */}
            <motion.ellipse
              id="shadow"
              cx={CX} cy={247} rx={18} ry={4}
              fill="#8B1A1A" fillOpacity={0.38}
              initial={{ opacity: 0, scaleX: 0 }}
              style={{ transformOrigin: `${CX}px 247px` }}
            />

            {/* Ghost arcs (left / right semicircles) */}
            <motion.path
              id="garc-l"
              d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 0 ${CX} ${CY + R}`}
              fill="none" stroke="#8B1A1A" strokeWidth="1"
              initial={{ opacity: 0 }}
            />
            <motion.path
              id="garc-r"
              d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX} ${CY + R}`}
              fill="none" stroke="#8B1A1A" strokeWidth="1"
              initial={{ opacity: 0 }}
            />

            {/* Gyroscope orbit ellipses */}
            <motion.ellipse
              id="gy1"
              cx={CX} cy={CY} rx={R} ry={R * 0.27}
              fill="none" stroke="#A03028" strokeWidth="2.5" strokeLinecap="round"
              initial={{ opacity: 0, rotate: 45 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />
            <motion.ellipse
              id="gy2"
              cx={CX} cy={CY} rx={R} ry={R * 0.27}
              fill="none" stroke="#7A1515" strokeWidth="2" strokeLinecap="round"
              initial={{ opacity: 0, rotate: -45 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />

            {/* Overlay vertical line segments for step 1 (with gaps matching arcs) */}
            <g clipPath="url(#vline-reveal)">
              {/* Segment 1: top-right arc [-85° to -5°] → y from sin(-85°)=-0.996R to sin(-5°)=-0.087R */}
              <motion.line id="vline0"
                x1={CX} y1={CY + R * Math.sin(toRad(-85))} x2={CX} y2={CY + R * Math.sin(toRad(-5))}
                stroke="#D42020" strokeWidth="10" strokeLinecap="round" initial={{ opacity: 0 }} />
              {/* Segment 2: bottom-right arc [5° to 85°] */}
              <motion.line id="vline1"
                x1={CX} y1={CY + R * Math.sin(toRad(5))} x2={CX} y2={CY + R * Math.sin(toRad(85))}
                stroke="#D42020" strokeWidth="10" strokeLinecap="round" initial={{ opacity: 0 }} />
              {/* Segment 3: bottom-left arc [95° to 175°] */}
              <motion.line id="vline2"
                x1={CX} y1={CY + R * Math.sin(toRad(95))} x2={CX} y2={CY + R * Math.sin(toRad(175))}
                stroke="#D42020" strokeWidth="10" strokeLinecap="round" initial={{ opacity: 0 }} />
              {/* Segment 4: top-left arc [185° to 265°] */}
              <motion.line id="vline3"
                x1={CX} y1={CY + R * Math.sin(toRad(185))} x2={CX} y2={CY + R * Math.sin(toRad(265))}
                stroke="#D42020" strokeWidth="10" strokeLinecap="round" initial={{ opacity: 0 }} />
            </g>

            {/* Four dashed arc segments — wrapped for 3D Y-axis rotation */}
            <g clipPath="url(#arc-reveal)">
              <motion.g
                id="arc-group"
                initial={{ scaleX: 0.01 }}
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                }}
              >
                {ARC_SEGMENTS.map(([s, e], i) => (
                  <motion.path
                    key={i}
                    id={`arc${i}`}
                    d={arcPath(s, e)}
                    fill="none"
                    stroke="#D42020"
                    strokeWidth="10"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                  />
                ))}
              </motion.g>
            </g>

            {/* Split circles for step 3 — start as full circles, tilt into crossed orbits */}
            <motion.ellipse
              id="split1"
              cx={CX} cy={CY}
              fill="none" stroke="url(#disk1Grad)" strokeWidth="12" strokeLinecap="round"
              pathLength={360}
              strokeDasharray="80 10"
              strokeDashoffset={-5}
              filter="url(#diskShadow)"
              initial={{ opacity: 0, rotate: 0, rx: R, ry: R }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />
            <motion.ellipse
              id="split2"
              cx={CX} cy={CY}
              fill="none" stroke="url(#disk2Grad)" strokeWidth="10" strokeLinecap="round"
              pathLength={360}
              strokeDasharray="80 10"
              strokeDashoffset={-5}
              filter="url(#diskShadow)"
              initial={{ opacity: 0, rotate: 0, rx: R, ry: R }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />

            {/* Full ring (momentary flash) */}
            <motion.circle
              id="fring"
              cx={CX} cy={CY} r={R}
              fill="none" stroke="#8B1A1A" strokeWidth="11" strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
            />

            {/* Needle grow line + dot — wrapped for 3D Y-axis rotation */}
            <motion.g
              id="rod-group"
              initial={{ rotateY: 0 }}
              style={{
                transformOrigin: `${CX}px ${CY}px`,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.path
                id="nline"
                d={`M ${CX} 58 L ${CX} 242`}
                stroke="#8B1A1A" strokeWidth="10" strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
              />

              {/* Dot at north tip */}
              <motion.circle
                id="dot"
                cx={CX} cy={58} r={5}
                fill="#B02020"
                initial={{ opacity: 0, scale: 0 }}
                style={{ transformOrigin: `${CX}px 58px` }}
              />
            </motion.g>

            {/* Final compass needle (diamond) */}
            <motion.g
              id="needle"
              initial={{ opacity: 0, rotate: 0 }}
              style={{ transformOrigin: `${CX}px ${CY}px`, filter: "url(#needleGlow)" }}
            >
              <path
                d={`M ${CX} 58 L ${CX + 14} ${CY} L ${CX} ${CY - 5} L ${CX - 14} ${CY} Z`}
                fill="#8B1A1A"
              />
              <path
                d={`M ${CX} 242 L ${CX + 14} ${CY} L ${CX} ${CY + 5} L ${CX - 14} ${CY} Z`}
                fill="#282828"
              />
              <circle cx={CX} cy={CY} r={8}   fill="#C2C2C2" />
              <circle cx={CX} cy={CY} r={4.5} fill="#8B1A1A" />
              <circle cx={CX} cy={CY} r={1.8} fill="#E8E8E8" />
            </motion.g>
          </svg>

          <motion.p
            id="ctitle"
            initial={{ opacity: 0, y: 10 }}
            style={{
              margin: "6px 0 0",
              color: "#7A1515",
              fontSize: 10,
              letterSpacing: "0.55em",
              textTransform: "uppercase",
              fontFamily: "'Cinzel', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
              fontWeight: 400,
              userSelect: "none",
            }}
          >
            Compass
          </motion.p>
        </div>
      </div>

      <div className="step-indicators">
        <div className={`step ${currentStep === 1 ? 'active-step' : ''}`}>Step 1: Dot at north</div>
        <div className={`step ${currentStep === 2 ? 'active-step' : ''}`}>Step 2: Needle grows down</div>
        <div className={`step ${currentStep === 3 ? 'active-step' : ''}`}>Step 3: Arc segments draw</div>
        <div className={`step ${currentStep === 4 ? 'active-step' : ''}`}>Step 4: Gyroscope sweep</div>
        <div className={`step ${currentStep === 5 ? 'active-step' : ''}`}>Step 5: Ring flash</div>
        <div className={`step ${currentStep === 6 ? 'active-step' : ''}`}>Step 6: Needle settles</div>
        <div className={`step ${currentStep === 7 ? 'active-step' : ''}`}>Step 7: Label revealed</div>
      </div>
    </div>
  );
}
