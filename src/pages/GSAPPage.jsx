import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/CompassAnimation.css';

const GSAPPage = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
    };

    React.useEffect(() => {
        animateStep(currentStep);
    }, [currentStep]);

    const animateStep = (step) => {
        const dot = document.querySelector('#step1-dot');
        const line2 = document.querySelector('#step2-line');
        const line3 = document.querySelector('#step3-line');
        const circle = document.querySelector('#step4-circle');
        const wrapper = document.querySelector('#frame-m-wrapper');

        gsap.killTweensOf([dot, line2, line3, circle, wrapper]);

        // Step 1: Show dot
        if (step >= 1) {
            gsap.to(dot, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        } else {
            gsap.to(dot, { opacity: 0, duration: 0.3 });
        }

        // Step 2: Show line 2 (TC to CC)
        if (step >= 2) {
            gsap.to(line2, {
                opacity: 1,
                attr: { y2: 150 },
                duration: 1,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(line2, {
                opacity: 0,
                attr: { y2: 50 },
                duration: 0.3,
            });
        }

        // Step 3: Show line 3 (CC to BC)
        if (step >= 3) {
            gsap.to(line3, {
                opacity: 1,
                attr: { y2: 250 },
                duration: 1,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(line3, {
                opacity: 0,
                attr: { y2: 150 },
                duration: 0.3,
            });
        }

        // Step 4: Rotate and show circle
        if (step === 4) {
            gsap.to(wrapper, {
                rotationY: -90,
                duration: 1.5,
                ease: 'power2.inOut',
            });
            gsap.to(circle, {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(wrapper, {
                rotationY: 0,
                duration: 1.5,
                ease: 'power2.inOut',
            });
            gsap.to(circle, {
                opacity: 0,
                duration: 0.3,
            });
        }
    };

    return (
        <div className="compass-container">
            <div className="nav-bar">
                <h1>Compass Animation - GSAP</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/framer">Framer</a>
                    <a href="/gsap" className="active">GSAP</a>
                </nav>
            </div>

            <div className="step-controls">
                <button onClick={handleReset} className="control-btn reset-btn" disabled={currentStep === 0}>
                    ↻ Reset
                </button>
                <button onClick={handlePrevStep} className="control-btn prev-btn" disabled={currentStep === 0}>
                    ← Previous
                </button>
                <span className="step-indicator">Step {currentStep} / 4</span>
                <button onClick={handleNextStep} className="control-btn next-btn" disabled={currentStep === 4}>
                    Next →
                </button>
            </div>

            <div className="animation-wrapper">
                <div id="frame-m-wrapper" style={{ transformStyle: 'preserve-3d' }}>
                    <svg viewBox="0 0 300 300" className="compass-svg">
                        {/* FRAME B: Background (Static, non-moving) - Dashed grid */}
                        <g id="frame-b">
                            {/* Vertical grid lines */}
                            <line x1="50" y1="0" x2="50" y2="300" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="150" y1="0" x2="150" y2="300" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />
                            <line x1="250" y1="0" x2="250" y2="300" stroke="#d0d0d0" strokeWidth="1" strokeDasharray="2,2" />

                            {/* Horizontal grid lines */}
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
                        </g>                        {/* FRAME M: Main/Moving elements (Red animations) - Overlaps B */}
                        <g id="frame-m">
                            {/* Step 1: Red dot at TC (150, 50) */}
                            <circle id="step1-dot" cx="150" cy="50" r="6" fill="#E74C3C" opacity="0" />

                            {/* Step 2: Line from TC to CC */}
                            <line id="step2-line" x1="150" y1="50" x2="150" y2="50" stroke="#E74C3C" strokeWidth="8" strokeLinecap="round" opacity="0" />

                            {/* Step 3: Line from CC to BC */}
                            <line id="step3-line" x1="150" y1="50" x2="150" y2="150" stroke="#E74C3C" strokeWidth="8" strokeLinecap="round" opacity="0" />

                            {/* Step 4: Full circle */}
                            <circle id="step4-circle" cx="150" cy="150" r="100" fill="none" stroke="#E74C3C" strokeWidth="8" opacity="0" />
                        </g>
                    </svg>
                </div>
            </div>

            <div className="step-description">
                {currentStep === 0 && <div className="description-box"><h2>Ready to start</h2><p>Click Next to begin</p></div>}
                {currentStep === 1 && <div className="description-box"><h2>Step 1: Center Point</h2><p>Red dot at TC (150, 50)</p></div>}
                {currentStep === 2 && <div className="description-box"><h2>Step 2: Growing Diameter</h2><p>Line extends from TC to CC (150, 150)</p></div>}
                {currentStep === 3 && <div className="description-box"><h2>Step 3: Full Diameter</h2><p>Line extends from TC to BC (150, 250)</p></div>}
                {currentStep === 4 && <div className="description-box"><h2>Step 4: 3D Rotation</h2><p>Frame rotates -90° along Y-axis revealing the circle</p></div>}
            </div>
        </div>
    );
};

export default GSAPPage;
