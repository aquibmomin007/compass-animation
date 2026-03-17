import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/CompassAnimation.css';

const FramerPage = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleReplay = () => {
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 100);
    };

    return (
        <div className="compass-container">
            <div className="nav-bar">
                <h1>Compass Animation - Framer Motion</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/framer" className="active">Framer</a>
                    <a href="/gsap">GSAP</a>
                </nav>
            </div>

            <button onClick={handleReplay} className="replay-btn">
                Replay Animation
            </button>

            <div className="animation-wrapper">
                <svg viewBox="0 0 300 300" className="compass-svg">
                    {/* Grid background */}
                    <line x1="50" y1="0" x2="50" y2="300" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="150" y1="0" x2="150" y2="300" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="250" y1="0" x2="250" y2="300" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />

                    <line x1="0" y1="50" x2="300" y2="50" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="0" y1="250" x2="300" y2="250" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Grid labels */}
                    <text x="45" y="35" fontSize="10" fill="#b0b0b0" textAnchor="end">TL</text>
                    <text x="150" y="35" fontSize="10" fill="#b0b0b0" textAnchor="middle">TC</text>
                    <text x="255" y="35" fontSize="10" fill="#b0b0b0" textAnchor="start">TR</text>

                    <text x="35" y="155" fontSize="10" fill="#b0b0b0" textAnchor="end">CL</text>
                    <text x="150" y="155" fontSize="10" fill="#b0b0b0" textAnchor="middle">CC</text>
                    <text x="265" y="155" fontSize="10" fill="#b0b0b0" textAnchor="start">CR</text>

                    <text x="45" y="275" fontSize="10" fill="#b0b0b0" textAnchor="end">BL</text>
                    <text x="150" y="275" fontSize="10" fill="#b0b0b0" textAnchor="middle">BC</text>
                    <text x="255" y="275" fontSize="10" fill="#b0b0b0" textAnchor="start">BR</text>

                    {/* Step 1: Red dot at TC */}
                    <motion.circle
                        cx="150"
                        cy="50"
                        r="6"
                        fill="#E74C3C"
                        initial={{ opacity: 0 }}
                        animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0 }}
                    />

                    {/* Step 2: Elongate from TC to CC */}
                    <motion.line
                        x1="150"
                        y1="50"
                        x2="150"
                        y2="150"
                        stroke="#E74C3C"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ y2: 50, opacity: 0 }}
                        animate={
                            isAnimating
                                ? { y2: 150, opacity: 1 }
                                : { y2: 50, opacity: 0 }
                        }
                        transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                    />

                    {/* Step 3: Elongate from CC to BC */}
                    <motion.line
                        x1="150"
                        y1="50"
                        x2="150"
                        y2="250"
                        stroke="#E74C3C"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ y2: 150, opacity: 0 }}
                        animate={
                            isAnimating
                                ? { y2: 250, opacity: 1 }
                                : { y2: 150, opacity: 0 }
                        }
                        transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Step 4: Rotate around Y axis */}
                    <motion.g
                        initial={{ rotateY: 0 }}
                        animate={isAnimating ? { rotateY: [0, 360] } : { rotateY: 0 }}
                        transition={{ duration: 1.2, delay: 2.5, ease: 'easeInOut' }}
                        style={{ transformOrigin: '150px 150px', perspective: '1000px' }}
                    >
                        <motion.circle
                            cx="150"
                            cy="150"
                            r="65"
                            fill="none"
                            stroke="#E74C3C"
                            strokeWidth="8"
                            initial={{ opacity: 0 }}
                            animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.1, delay: 2.5 }}
                        />
                    </motion.g>

                    {/* Step 5-6: Rotating circle */}
                    <motion.g
                        initial={{ rotateZ: 0 }}
                        animate={
                            isAnimating
                                ? { rotateZ: [0, 180, 540] }
                                : { rotateZ: 0 }
                        }
                        transition={{
                            duration: 3,
                            times: [0, 0.4, 1],
                            delay: 3.7,
                            ease: 'easeInOut',
                        }}
                        style={{ transformOrigin: '150px 150px' }}
                    >
                        {[0, 90, 180, 270].map((angle) => (
                            <line
                                key={angle}
                                x1="150"
                                y1="80"
                                x2="150"
                                y2="100"
                                stroke="#E74C3C"
                                strokeWidth="6"
                                strokeLinecap="round"
                                style={{
                                    transformOrigin: '150px 150px',
                                    transform: `rotate(${angle}deg)`,
                                }}
                            />
                        ))}

                        <circle
                            cx="150"
                            cy="150"
                            r="65"
                            fill="none"
                            stroke="#E74C3C"
                            strokeWidth="8"
                        />
                    </motion.g>

                    {/* Step 7: Compass pointers */}
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 6.7 }}
                    >
                        <polygon points="150,75 145,95 155,95" fill="#E74C3C" />
                        <text x="150" y="70" fontSize="12" fontWeight="bold" fill="#E74C3C" textAnchor="middle">N</text>

                        <polygon points="150,225 145,205 155,205" fill="#333" />
                        <text x="150" y="245" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">S</text>

                        <polygon points="225,150 205,145 205,155" fill="#333" />
                        <text x="250" y="155" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">E</text>

                        <polygon points="75,150 95,145 95,155" fill="#333" />
                        <text x="30" y="155" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">W</text>
                    </motion.g>

                    <motion.circle
                        cx="150"
                        cy="150"
                        r="6"
                        fill="#E74C3C"
                        initial={{ opacity: 0 }}
                        animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.2, delay: 6.7 }}
                    />
                </svg>
            </div>

            <div className="step-indicators">
                <div className="step">Step 1: Red dot at TC</div>
                <div className="step">Step 2: Elongate TC → CC</div>
                <div className="step">Step 3: Elongate CC → BC</div>
                <div className="step">Step 4: Rotate Y-axis (3D)</div>
                <div className="step">Step 5: Rotate Z-axis</div>
                <div className="step">Step 6: Fast spinning</div>
                <div className="step">Step 7: Reveal compass</div>
            </div>
        </div>
    );
};

export default FramerPage;
