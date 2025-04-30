import React from 'react';
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';

const TermsAndConditionsPopup = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs shadow-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {translations[language].termsAndConditions}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={translations[language].close}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-gray-600 text-sm flex-grow">
          {translations[language].termsSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-800 mb-2">
                {index + 1}. {section.heading}
              </h3>
              <p className="mb-4">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPopup;