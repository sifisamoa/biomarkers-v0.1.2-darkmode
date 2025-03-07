import React, { useContext, useState } from 'react';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { format } from 'date-fns'
import './BiomarkerHistory.css'
import BiomarkerDetailsModal from './BiomarkerDetailsModal';

const BiomarkerHistory = () => {
  const { biomarkerEntries, deleteBiomarkerEntry, updateBiomarkerEntry } = useContext(BiomarkerContext);
  const [editEntryId, setEditEntryId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [selectedEntry, setSelectedEntry] = useState(null); // State for the modal
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (entryId) => {
    const entryToEdit = biomarkerEntries.find(entry => entry.id === entryId);
    setEditedValues(entryToEdit);
    setEditEntryId(entryId);
  };

  const handleUpdate = (entryId) => {
    updateBiomarkerEntry(entryId, editedValues);
    setEditEntryId(null);
  };

  const handleCancelEdit = () => {
    setEditEntryId(null);
    setEditedValues({});
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('biomarkers.')) {
      const biomarkerName = name.split('.')[1];
      setEditedValues(prev => ({
        ...prev,
        biomarkers: {
          ...prev.biomarkers,
          [biomarkerName]: value
        }
      }));
    } else {
      setEditedValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

    const openModal = (entry) => {
        setSelectedEntry(entry);
        setShowModal(true);
    }

    const closeModal = () => {
        setSelectedEntry(null);
        setShowModal(false);
    }

  return (
    <div className='history-container'>
      <h2>Biomarker History</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight (kg)</th>
              <th>Blood Pressure (mmHg)</th>
              <th>HbA1c (mmol/mol)</th>
              <th>Uric Acid (mmol/L)</th>
            </tr>
          </thead>
          <tbody>
            {biomarkerEntries.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry) => (
              <tr key={entry.id} onClick={() => openModal(entry)} style={{cursor: 'pointer'}}>
                <td>{format(new Date(entry.date), 'dd/MM/yyyy')}</td>
                <td>{entry.biomarkers.weight}</td>
                <td>{entry.biomarkers.bloodPressure}</td>
                <td>{entry.biomarkers.hba1c}</td>
                <td>{entry.biomarkers.uricAcid}</td>
              </tr>
            ))}
          </tbody>
        </table>
          {showModal && (
              <BiomarkerDetailsModal entry={selectedEntry} onClose={closeModal} />
          )}
      </div>
    </div>
  );
};

export default BiomarkerHistory;
