import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context with default values
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {}
});

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load saved language from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update localStorage when language changes
  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for accessing language context
export const useLanguage = () => useContext(LanguageContext);