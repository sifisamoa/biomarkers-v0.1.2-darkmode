import React, { useContext, useState } from 'react';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'; // Import Filler
import { format } from 'date-fns'
import { FaPlusCircle, FaHistory, FaChartLine } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

ChartJS.
