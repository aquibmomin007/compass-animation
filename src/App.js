import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompassPage from './pages/CompassPage';
import CMenuPage from './pages/CMenuPage';
import Compass1Page from './pages/Compass1Page';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compass" element={<CompassPage />} />
          <Route path="/compass1" element={<Compass1Page />} />
          <Route path="/cmenu" element={<CMenuPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
