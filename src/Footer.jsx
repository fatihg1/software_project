import { Link } from 'react-router-dom';
import {useLanguage} from './LanguageContext';
import translations from './translations.jsx';
const Footer = () => {
  const { language } = useLanguage();
  // Scroll to top when a footer link is clicked
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-white">{translations[language].trainTicketBooking}</h2>
          <p className="mt-2 text-gray-400">
            {translations[language].footerText}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">{translations[language].quickLinks}</h3>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            <li><Link to="/" className="hover:text-white" onClick={handleScrollToTop}>{translations[language].home}</Link></li>
            <li><Link to="/help" className="hover:text-white" onClick={handleScrollToTop}>{translations[language].helpCenter}</Link></li>
            <li><Link to="/about-us" className="hover:text-white" onClick={handleScrollToTop}>{translations[language].about}</Link></li>
            <li><Link to="/contact" className="hover:text-white" onClick={handleScrollToTop}>{translations[language].contact}</Link></li>
            <li><Link to="/faqs" className="hover:text-white" onClick={handleScrollToTop}>{translations[language].faqs}</Link></li>
            <li><Link to="/rules" className="hover:text-white" onClick={handleScrollToTop}>{translations[language].rules}</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white">{translations[language].contact}</h3>
          <p className="mt-2 text-gray-400">{translations[language].address}</p>
          <p className="mt-1 text-gray-400">{translations[language].email}</p>
          <p className="mt-1 text-gray-400">{translations[language].phone}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-700 mt-4 pt-2">
        {translations[language].rightsReserved}
      </div>
    </footer>
  );
};

export default Footer;
