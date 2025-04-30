import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, X } from "lucide-react";
import { useLanguage } from "./LanguageContext.jsx";
import translations from "./translations.jsx";

const TrainRulesPopUp = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [openRule, setOpenRule] = useState(null);
  
  const togglePopup = () => setIsOpen(!isOpen);
  const toggleRule = (title) => setOpenRule(openRule === title ? null : title);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={togglePopup}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
        aria-label={translations[language].rulesButton}
      >
        <Info className="w-6 h-6" />
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div>
          <div className="fixed inset-0 h-screen w-screen bg-opacity-30 backdrop-blur-sm z-50" />
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Info className="text-white w-6 h-6" />
                  <h2 className="text-xl font-bold text-white">
                    {translations[language].trainRulesTitle}
                  </h2>
                </div>
                <button
                  onClick={togglePopup}
                  className="text-white hover:text-gray-200 focus:outline-none"
                  aria-label={translations[language].closeButton}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-4rem)]">
                <div className="space-y-3">
                  {Object.entries(translations[language].trainRules).map(([key, rule]) => (
                    <div
                      key={key}
                      className="border border-blue-100 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
                    >
                      <button
                        onClick={() => toggleRule(key)}
                        className={`
                          w-full text-left p-3 flex justify-between items-center 
                          ${openRule === key 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                            : 'bg-gradient-to-r from-white to-blue-50 text-blue-800 hover:bg-blue-50'}
                          focus:outline-none transition-colors duration-200
                        `}
                      >
                        <span className="font-medium">{rule.title}</span>
                        {openRule === key ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      
                      {openRule === key && (
                        <div className="p-3 bg-white text-gray-700 text-sm leading-relaxed">
                          <div className="whitespace-pre-wrap">{rule.content}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainRulesPopUp;