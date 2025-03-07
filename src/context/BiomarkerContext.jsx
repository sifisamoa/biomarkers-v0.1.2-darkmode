import React, { createContext, useState, useEffect } from 'react';

const BiomarkerContext = createContext();

const BiomarkerProvider = ({ children }) => {
  const [biomarkerEntries, setBiomarkerEntries] = useState([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem('biomarkerEntries');
    if (storedEntries) {
      setBiomarkerEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    if (biomarkerEntries.length > 0) {
      localStorage.setItem('biomarkerEntries', JSON.stringify(biomarkerEntries));
    }
  }, [biomarkerEntries]);

  const addBiomarkerEntry = (entry) => {
    setBiomarkerEntries([...biomarkerEntries, entry]);
  };

  const deleteBiomarkerEntry = (id) => {
    const updatedEntries = biomarkerEntries.filter((entry) => entry.id !== id);
    setBiomarkerEntries(updatedEntries);
    localStorage.setItem('biomarkerEntries', JSON.stringify(updatedEntries));
  };

  const updateBiomarkerEntry = (id, updatedEntry) => {
    const updatedEntries = biomarkerEntries.map(entry => {
      if (entry.id === id) {
        return { ...entry, ...updatedEntry };
      }
      return entry;
    });
    setBiomarkerEntries(updatedEntries);
    localStorage.setItem('biomarkerEntries', JSON.stringify(updatedEntries));
  };

  return (
    <BiomarkerContext.Provider value={{ biomarkerEntries, addBiomarkerEntry, deleteBiomarkerEntry, updateBiomarkerEntry }}>
      {children}
    </BiomarkerContext.Provider>
  );
};

export { BiomarkerContext, BiomarkerProvider };
