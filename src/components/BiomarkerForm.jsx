import React, { useState, useContext, useEffect } from 'react';
import { BiomarkerContext } from '../context/BiomarkerContext';
import { v4 as uuidv4 } from 'uuid';
import './BiomarkerForm.css';
import { useNavigate } from 'react-router-dom';

const BiomarkerForm = () => {
  const { addBiomarkerEntry } = useContext(BiomarkerContext);
  const navigate = useNavigate();
  const [entryDate, setEntryDate] = useState('');
  const [biomarkers, setBiomarkers] = useState({
    weight: '',
    bloodPressure: '', // New field
    hba1c: '',
    sodium: '',
    potassium: '',
    creatinine: '',
    uricAcid: '',
    egfr: '',
    cholesterol: '',
    triglyceride: '',
    hdl: '',
    ldl: '',
    cholHdlRatio: '',
    t4Free: '',
    tsh: '',
    bilirubin: '',
    alkalinePhosphatase: '',
    ggt: '',
    alt: '',
    ast: '',
    protein: '',
    albumin: '',
    globulin: '',
  });
  const [notes, setNotes] = useState('');

  const handleChange = (e) => {
    setBiomarkers({ ...biomarkers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: uuidv4(),
      date: entryDate,
      biomarkers,
      notes,
    };
    addBiomarkerEntry(newEntry);
    navigate('/history');
  };

  // This useEffect hook adds the event listener to *all* number inputs
  // within the form *after* the component mounts.  This is crucial.
  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    const preventScroll = (e) => {
      e.preventDefault();
    };

    numberInputs.forEach(input => {
      input.addEventListener('wheel', preventScroll, { passive: false });
    });

    // Cleanup function:  Remove the event listeners when the component
    // unmounts.  This prevents memory leaks and unexpected behavior.
    return () => {
      numberInputs.forEach(input => {
        input.removeEventListener('wheel', preventScroll, { passive: false });
      });
    };
  }, []); // Empty dependency array means this effect runs *once* after mounting.


  return (
    <form onSubmit={handleSubmit} className="biomarker-form">
      <h2>Add Biomarker Entry</h2>
      <label>
        Date:
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          required
        />
      </label>

      {/* Biomarker Input Fields */}
      <label>Weight (kg): <input type="number" name="weight" value={biomarkers.weight} onChange={handleChange} /></label>
      <label>Blood Pressure (e.g., 120/80): <input type="text" name="bloodPressure" value={biomarkers.bloodPressure} onChange={handleChange} /></label> {/* New Field */}
      <label>HbA1c (mmol/mol): <input type="number" name="hba1c" value={biomarkers.hba1c} onChange={handleChange} /></label>
      <label>Sodium (mmol/L): <input type="number" name="sodium" value={biomarkers.sodium} onChange={handleChange} /></label>
      <label>Potassium (mmol/L): <input type="number" name="potassium" value={biomarkers.potassium} onChange={handleChange} /></label>
      <label>Creatinine (µmol/L): <input type="number" name="creatinine" value={biomarkers.creatinine} onChange={handleChange} /></label>
      <label>Uric Acid (mmol/L): <input type="number" name="uricAcid" value={biomarkers.uricAcid} onChange={handleChange} /></label>
      <label>eGFR: <input type="number" name="egfr" value={biomarkers.egfr} onChange={handleChange} /></label>
      <label>Cholesterol (mmol/L): <input type="number" name="cholesterol" value={biomarkers.cholesterol} onChange={handleChange} /></label>
      <label>Triglyceride (mmol/L): <input type="number" name="triglyceride" value={biomarkers.triglyceride} onChange={handleChange} /></label>
      <label>HDL (mmol/L): <input type="number" name="hdl" value={biomarkers.hdl} onChange={handleChange} /></label>
      <label>LDL (mmol/L): <input type="number" name="ldl" value={biomarkers.ldl} onChange={handleChange} /></label>
      <label>Chol/HDL Ratio: <input type="number" name="cholHdlRatio" value={biomarkers.cholHdlRatio} onChange={handleChange} /></label>
      <label>T4 Free (pmol/L): <input type="number" name="t4Free" value={biomarkers.t4Free} onChange={handleChange} /></label>
      <label>TSH (mIU/L): <input type="number" name="tsh" value={biomarkers.tsh} onChange={handleChange} /></label>
      <label>Bilirubin (µmol/L): <input type="number" name="bilirubin" value={biomarkers.bilirubin} onChange={handleChange} /></label>
      <label>Alkaline Phosphatase (U/L): <input type="number" name="alkalinePhosphatase" value={biomarkers.alkalinePhosphatase} onChange={handleChange} /></label>
      <label>GGT (U/L): <input type="number" name="ggt" value={biomarkers.ggt} onChange={handleChange} /></label>
      <label>ALT (U/L): <input type="number" name="alt" value={biomarkers.alt} onChange={handleChange} /></label>
      <label>AST (U/L): <input type="number" name="ast" value={biomarkers.ast} onChange={handleChange} /></label>
      <label>Protein (g/L): <input type="number" name="protein" value={biomarkers.protein} onChange={handleChange} /></label>
      <label>Albumin (g/L): <input type="number" name="albumin" value={biomarkers.albumin} onChange={handleChange} /></label>
      <label>Globulin (g/L): <input type="number" name="globulin" value={biomarkers.globulin} onChange={handleChange} /></label>

      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      <button type="submit" className="btn-primary">Add Entry</button>
    </form>
  );
};

export default BiomarkerForm;
