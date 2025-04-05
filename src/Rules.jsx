import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ScrollText, Luggage, UserCheck, TrainFront } from 'lucide-react';
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';

const RuleSection = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4">
          <ul className="space-y-2 text-gray-700">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

const TrainRules = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center space-x-3">
          <TrainFront size={36} />
          <span>{t.passengerGuidelines}</span>
        </h1>
        <p className="mt-2 text-blue-100">{t.subtitle}</p>
      </div>

      <div>
        <RuleSection title={t.guidelines.pggeneralInfo.title} icon={ScrollText}>
          {t.guidelines.pggeneralInfo.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </RuleSection>

        <RuleSection title={t.guidelines.pgluggagePolicy.title} icon={Luggage}>
          {t.guidelines.pgluggagePolicy.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </RuleSection>

        <RuleSection title={t.guidelines.pgbehaviorSafety.title} icon={UserCheck}>
          {t.guidelines.pgbehaviorSafety.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </RuleSection>

        <RuleSection title={t.guidelines.pgarrivalDeparture.title} icon={TrainFront}>
          {t.guidelines.pgarrivalDeparture.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </RuleSection>
      </div>
    </div>
  );
};

export default TrainRules;