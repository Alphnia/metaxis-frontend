import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ProductForm from './components/ProductForm';
import AnalysisResults from './components/AnalysisResults';
import InfluencerSelection from './components/InfluencerSelection';
import ProjectForm from './components/ProjectForm';

function HomePage() {
  const navigate = useNavigate(); 
  
  const handleStart = () => {
    navigate('/newproject');
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/logo.svg?v=2" alt="Metaxis Logo" className="logo"  />
      </div>
      <button onClick={handleStart} className="find-creators-btn">
        Find Creators!
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/analyze" element={<AnalysisResults />} />
        <Route path="/influencer-selection" element={<InfluencerSelection />} />

        <Route path="/newproject" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
}

export default App;