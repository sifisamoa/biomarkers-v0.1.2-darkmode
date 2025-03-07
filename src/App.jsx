import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import BiomarkerForm from './components/BiomarkerForm';
import BiomarkerHistory from './components/BiomarkerHistory';
import { BiomarkerProvider } from './context/BiomarkerContext';
import './App.css'
import { FaPlusCircle, FaHistory, FaChartLine } from "react-icons/fa";
import Dashboard from './components/Dashboard';

function App() {
  const navigate = useNavigate();
  return (
    <BiomarkerProvider>
      <div className="app-container">
        <h1>Biomarker Tracker</h1>
        <nav>
          <ul>
            <li>
              <Link to="/" className = "btn-primary">Dashboard</Link>
            </li>
            <li>
              <Link to="/add" className = "btn-primary">Add Biomarker</Link>
            </li>
            <li>
              <Link to="/history" className = "btn-primary">View History</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<BiomarkerForm />} />
          <Route path="/history" element={<BiomarkerHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BiomarkerProvider>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default App;
