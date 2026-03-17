import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Compass Animation</h1>
                <p>Experience the same animation built with two different libraries</p>

                <div className="library-grid">
                    <Link to="/framer" className="library-card framer-card">
                        <div className="library-icon">🎬</div>
                        <h2>Framer Motion</h2>
                        <p>Declarative, React-focused animation library with intuitive API</p>
                        <button className="view-btn">View Animation</button>
                    </Link>

                    <Link to="/gsap" className="library-card gsap-card">
                        <div className="library-icon">⚡</div>
                        <h2>GSAP (GreenSock)</h2>
                        <p>Powerful timeline-based animation framework with advanced controls</p>
                        <button className="view-btn">View Animation</button>
                    </Link>
                </div>

                <div className="comparison">
                    <h3>Comparison</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Framer Motion</th>
                                <th>GSAP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Learning Curve</td>
                                <td>Easy (React-native)</td>
                                <td>Moderate</td>
                            </tr>
                            <tr>
                                <td>Bundle Size</td>
                                <td>Larger</td>
                                <td>Smaller</td>
                            </tr>
                            <tr>
                                <td>Performance</td>
                                <td>Good</td>
                                <td>Excellent</td>
                            </tr>
                            <tr>
                                <td>Timeline Control</td>
                                <td>Limited</td>
                                <td>Advanced</td>
                            </tr>
                            <tr>
                                <td>3D Support</td>
                                <td>Basic</td>
                                <td>Advanced</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
