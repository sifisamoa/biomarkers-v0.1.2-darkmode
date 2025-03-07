import React, { useState, useContext } from 'react';
import './BiomarkerDetailsModal.css';
import ModalPortal from './ModalPortal';
import { BiomarkerContext } from '../context/BiomarkerContext';

const BiomarkerDetailsModal = ({ entry, onClose }) => {
  const { updateBiomarkerEntry, deleteBiomarkerEntry } = useContext(BiomarkerContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState(entry);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedEntry({ ...entry }); // Initialize with current entry data
  };

  const handleSaveEdit = () => {
    updateBiomarkerEntry(entry.id, editedEntry);
    setIsEditing(false);
    onClose();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEntry(entry); // Reset to original values
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteBiomarkerEntry(entry.id);
      onClose();
    }
  };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
        if (name.startsWith('biomarkers.')) {
        const biomarkerName = name.split('.')[1];
        setEditedEntry(prev => ({
            ...prev,
            biomarkers: {
            ...prev.biomarkers,
            [biomarkerName]: value
            }
        }));
        } else {
        setEditedEntry(prev => ({
            ...prev,
            [name]: value
        }));
        }
  };

  if (!entry) return null;

  return (
    <ModalPortal>
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Biomarker Details - {entry.date}</h2>
          {isEditing ? (
            <>
              <table >
                <thead>
                  <tr>
                    <th>Biomarker</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Date</td>
                    <td>
                      <input
                        type="date"
                        name="date"
                        value={editedEntry.date}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  {Object.entries(editedEntry.biomarkers).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>
                        <input
                          type="text"
                          name={`biomarkers.${key}`}
                          value={value}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Notes</td>
                    <td>
                      <textarea
                        name="notes"
                        value={editedEntry.notes}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-button-container">
                <button className="btn-primary" onClick={handleSaveEdit}>Save</button>
                <button className = "btn-primary" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Biomarker</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(entry.biomarkers).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Notes</td>
                    <td>{entry.notes}</td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-button-container">
                <button className="btn-primary" onClick={handleEditClick}>Edit</button>
                <button className="btn-delete" onClick={handleDelete}>Delete</button>
                <button className="btn-primary" onClick={onClose}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default BiomarkerDetailsModal;
