import React, { useState } from 'react';
import { FileText, User, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext.jsx';
import translations from './translations.jsx';

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10,
      delay: 0 // Try removing or reducing the delay
    }
  }
};


const HelpCenter = () => {
  const { language } = useLanguage();
  const t = translations[language].helpCenterD;
  
  const [appealType, setAppealType] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    email: ''
  });
  const [travelInfo, setTravelInfo] = useState({
    ticketId: '',
    departureStation: '',
    arrivalStation: ''
  });
  const [appealContext, setAppealContext] = useState('');
  const [submissionConfirmation, setSubmissionConfirmation] = useState(null);

  const generateAppealNumber = () => {
    return Array.from(
      { length: 12 }, 
      () => Math.floor(Math.random() * 10)
    ).join('');
  };

  const handleSubmitAppeal = async (e) => {
    e.preventDefault();
  
    const newAppeal = {
      user: `${contactInfo.name} ${contactInfo.surname}`,
      subject: appealType,
      message: appealContext,
      content: appealContext,
      email: contactInfo.email,
      phone: contactInfo.phoneNumber,
      date: new Date().toISOString()
    };
  
    try {
      const response = await fetch("http://localhost:8080/appeals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppeal),
      });
  
      if (response.ok) {
        const newAppealNumber = generateAppealNumber();
        setSubmissionConfirmation(newAppealNumber);
        setAppealType('');
        setContactInfo({ name: '', surname: '', phoneNumber: '', email: '' });
        setTravelInfo({ ticketId: '', departureStation: '', arrivalStation: '' });
        setAppealContext('');
      } else {
        console.error("Başvuru gönderilemedi.");
      }
    } catch (err) {
      console.error("Hata:", err.message);
    }
  };
  

  return (
    <motion.div
      key={location.pathname} 
      initial="hidden"
      animate="visible"
      variants={slideUp}
      viewport={{ once: true, amount: 0.5 }}
      className="max-w-4xl mx-auto p-4 pt-40"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-white">
        <form onSubmit={handleSubmitAppeal} className="space-y-6">
          {/* Appeal Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t.appealType}</label>
            <select
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={appealType}
              onChange={(e) => setAppealType(e.target.value)}
              required
            >
              <option value="">{t.selectType}</option>
              {Object.entries(t.appealTypes).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <User size={20} className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">{t.contactInfo.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(t.contactInfo.fields).map(([field, label]) => (
                <div key={field}>
                  <label className="block text-gray-600 mb-2">{label}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={label}
                    value={contactInfo[field]}
                    onChange={(e) => setContactInfo({...contactInfo, [field]: e.target.value})}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Travel Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Map size={20} className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-700">{t.travelInfo.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(t.travelInfo.fields).map(([field, label]) => (
                <div key={field}>
                  <label className="block text-gray-600 mb-2">{label}</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder={label}
                    value={travelInfo[field]}
                    onChange={(e) => setTravelInfo({...travelInfo, [field]: e.target.value})}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Appeal Context */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">{t.appealContent}</label>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder={t.appealContentPlaceholder}
              rows={4}
              value={appealContext}
              onChange={(e) => setAppealContext(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <FileText size={20} className="mr-2" />
            {t.submitButton}
          </button>
        </form>

        {submissionConfirmation && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
              {t.success.title}
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">{t.success.numberLabel}</p>
              <p className="text-xl font-bold tracking-wider text-green-700">
                {submissionConfirmation}
              </p>
            </div>
            <p className="mt-4 text-green-700 text-center">
              {t.success.note}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HelpCenter;