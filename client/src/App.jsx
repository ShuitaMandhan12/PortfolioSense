import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generator />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

export default App;