import React, { useContext, useState } from 'react';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format } from 'date-fns';
import { FaPlusCircle, FaHistory, FaChartLine } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { biomarkerEntries } = useContext(BiomarkerContext);
  const [selectedBiomarker, setSelectedBiomarker] = useState('weight');
  const navigate = useNavigate();

  // Updated gradient function to use CSS variables
  const createGradient = (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return null;
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(138, 43, 226, 0.7)'); // var(--primary-accent) with opacity
    gradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.7)'); // Lighter purple/pink
    gradient.addColorStop(1, 'rgba(138, 43, 226, 0.1)'); // var(--primary-accent) with low opacity
    return gradient;
  };


  const getChartData = () => {
    const sortedEntries = [...biomarkerEntries].sort((a, b) => new Date(a.date) - new Date(b.date));

    const filteredEntries = sortedEntries.filter(entry => {
      if (selectedBiomarker === 'bloodPressure') {
        const bp = entry.biomarkers.bloodPressure;
        if (!bp) return false;
        const [systolic, diastolic] = bp.split('/').map(Number);
        return systolic !== 0 || diastolic !== 0;
      } else {
        return entry.biomarkers[selectedBiomarker] != 0 && entry.biomarkers[selectedBiomarker] != null;
      }
    });

    const labels = filteredEntries.map((entry) => format(new Date(entry.date), 'dd/MM/yyyy'));

    if (selectedBiomarker === 'bloodPressure') {
      const systolicData = filteredEntries.map(entry => {
        const bp = entry.biomarkers.bloodPressure;
        return bp ? parseInt(bp.split('/')[0]) : 0;
      });

      const diastolicData = filteredEntries.map(entry => {
        const bp = entry.biomarkers.bloodPressure;
        return bp ? parseInt(bp.split('/')[1]) : 0;
      });

      return {
        labels,
        datasets: [
          {
            label: 'Systolic',
            data: systolicData,
            fill: true,
            backgroundColor: createGradient, // Use the gradient function
            borderColor: 'rgba(255, 99, 132, 1)', // Reddish
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(255, 99, 132, 1)',
            pointBorderWidth: 2,
            pointRadius: 4, // Smaller points
            pointHoverRadius: 6, // Smaller hover
          },
          {
            label: 'Diastolic',
            data: diastolicData,
            fill: true,
            backgroundColor: createGradient, // Use the gradient function
            borderColor: 'rgba(54, 162, 235, 1)', // Bluish
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(54, 162, 235, 1)',
            pointBorderWidth: 2,
            pointRadius: 4, // Smaller points
            pointHoverRadius: 6, // Smaller hover
          },
        ],
      };
    } else {
      const data = filteredEntries.map((entry) => entry.biomarkers[selectedBiomarker] || 0);
      return {
        labels,
        datasets: [
          {
            label: selectedBiomarker.toUpperCase(),
            data,
            fill: true,
            backgroundColor: createGradient, // Use the gradient function
            borderColor: 'rgba(138, 43, 226, 1)', // Purple
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(138, 43, 226, 1)',
            pointBorderWidth: 2,
            pointRadius: 4, // Smaller points
            pointHoverRadius: 6, // Smaller hover
          },
        ],
      };
    }
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: '#c5c6d0', // Light gray tick labels
        }
      },
      x: {
        ticks: {
          color: '#c5c6d0'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#c5c6d0'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dateStr = context.label;
            const entry = biomarkerEntries.find(e => format(new Date(e.date), 'dd/MM/yyyy') === dateStr);
            const label = context.dataset.label || '';

            if (entry && entry.notes) {
              return `${label}: ${context.parsed.y} (${entry.notes})`;
            }
            return `${label}: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div className='dashboard-container'>
      <h2>Welcome to Your Dashboard</h2>
      <p>Track your biomarkers and visualize your progress.</p>

      <div className='chart-and-buttons'>
        <div className='chart-container'>
          <select value={selectedBiomarker} onChange={(e) => setSelectedBiomarker(e.target.value)}>
            <option value="" disabled>Select a Biomarker</option> {/* Placeholder option */}
            {Object.keys(biomarkerEntries[0]?.biomarkers || {}).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <Line data={getChartData()} options={options} />
        </div>

        <div className="button-container">
          <button className="btn-primary" onClick={() => navigate('/add')}><FaPlusCircle style={{ marginRight: '8px' }} />Add</button>
          <button className="btn-primary" onClick={() => navigate('/history')}><FaHistory style={{ marginRight: '8px' }} />View History</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
