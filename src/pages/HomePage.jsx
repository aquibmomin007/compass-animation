import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Compass Animation</h1>
                <p>Step-by-step compass animation built with Framer Motion</p>

                <div className="library-grid">
                    <Link to="/compass" className="library-card framer-card">
                        <div className="library-icon">🧭</div>
                        <h2>Compass</h2>
                        <p>Cinematic step-by-step animation with arcs, gyroscope sweep, and needle settle</p>
                        <button className="view-btn">View Animation</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
