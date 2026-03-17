import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FramerPage from './pages/FramerPage';
import GSAPPage from './pages/GSAPPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/framer" element={<FramerPage />} />
          <Route path="/gsap" element={<GSAPPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
