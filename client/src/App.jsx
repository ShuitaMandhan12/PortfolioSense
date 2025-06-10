// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';
import PortfolioPage from './pages/PortfolioView';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
     <PortfolioProvider>
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#00178F] via-[#4B96FF] to-[#FFA2B6]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/portfolio/:id" element={<PortfolioPage />} />
        </Routes>
    
      </div>
    </Router>
    </PortfolioProvider>
  );
}

export default App;