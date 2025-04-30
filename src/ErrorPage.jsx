import { Train, Home } from 'lucide-react';
import {useLanguage} from './LanguageContext.jsx';
import translations from './translations.jsx';
export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };
  const {language} = useLanguage();
  const t = translations[language].errorPage;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Train size={36} className="text-white"/>
            <h1 className="text-4xl font-bold tracking-tight">{t.notFound}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
        <p className="text-gray-500 mb-0">
          {t.code}
          </p>
          <div className="text-9xl font-bold text-gray-300 mb-2">404</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t.desc}</h2>
          <p className="text-gray-500 mb-7">
          {t.text}
          </p>
          
          <button 
            onClick={handleGoHome}
            className="inline-flex items-center space-x-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            <Home size={30} />
            <span>{t.back}</span>
          </button>
        </div>
      </div>
    </div>
  );
}