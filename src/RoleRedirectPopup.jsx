import { useState, useEffect } from 'react';
import {useLanguage} from './LanguageContext';
import translations from "./translations.jsx";
export default function RoleRedirectPopup({ 
  isSignedIn, 
  isLoaded, 
  user, 
  location, 
  navigate, 
  onClose 
}) {
    const { language } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const t = translations[language].RoleRedirectPopup;
  useEffect(() => {
    
    // Check if we should show the popup
    const checkRoleAndShowPopup = () => {
      const redirectedFromState = location.state?.isRedirected || false;
      const popupShownState = sessionStorage.getItem('rolePopupShown');

      if (isLoaded && isSignedIn && user && location.pathname === '/') {
        // Get user role from metadata
        const role = user.publicMetadata.role;
        
        if (role === 'admin' || role === 'manager') {
          setUserRole(role);
          setShowPopup(true);
        }
      }
    };

    checkRoleAndShowPopup();
  }, [isSignedIn, isLoaded, user, location]);

  const handleNavigation = (shouldRedirect) => {
    // Mark that we've shown the popup for this session
    sessionStorage.setItem('rolePopupShown', 'true');
    setShowPopup(false);
    
    if (shouldRedirect && userRole) {
      navigate(`/${userRole}`, { state: { isRedirected: true } });
    }
    
    if (onClose) onClose();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full text-center">
        <div className="text-xl font-bold mb-4 text-blue-900">{t.title}</div>
        <p className="mb-6 text-gray-700">
          {t.message}
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition duration-200"
            onClick={() => handleNavigation(true)}
          >
            {t.buttonText}
          </button>
          <button 
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-200 transition duration-200"
            onClick={() => handleNavigation(false)}
          >
            {t.stayText}
          </button>
        </div>
      </div>
    </div>
  );
}