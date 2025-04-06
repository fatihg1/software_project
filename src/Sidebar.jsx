import { useState, useEffect } from 'react';
import { SignIn, useClerk, UserButton } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import translations from './translations.jsx';
import { useLanguage } from './LanguageContext.jsx';
function SideNavigation() {
  const { language } = useLanguage();
  const t = translations[language].sidebar;
  const navigate = useNavigate();
  const location = useLocation();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById('side-menu');
      const menuButton = document.getElementById('menu-button');
      
      if (isMenuOpen && menu && !menu.contains(event.target) && !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Scroll to top and navigate
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  
  // Function to get user role from metadata
  const getUserRole = () => {
    if (!isSignedIn || !user) return null;
    
    // Assuming role is stored in publicMetadata
    return user.publicMetadata.role;
  };
  
  const userRole = getUserRole();

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Fixed Menu Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          id="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-blue-800 p-3 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Side Menu */}
      <div 
        id="side-menu"
        className={`fixed top-0 right-0 h-full lg:w-80 sm:w-1/2 bg-blue-800 text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo and Brand */}
          <div className="p-6 border-b border-blue-700">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt={t.logoAlt}
                  className="w-full h-full object-cover hover:cursor-pointer"
                  onClick={() => handleNavigation("/")}
                />
              </div>
              <button
                className="text-2xl font-bold transition duration-300 hover:cursor-pointer hover:text-blue-300"
                onClick={() => handleNavigation("/")}
              >
                {t.brandName}
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-blue-700">
            {!isSignedIn ? (
              <div className="flex justify-between items-center">
                <span>{t.signInPrompt}</span>
                <button 
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200"
                  onClick={() => openSignIn()}
                >
                  {t.signIn}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonPopoverCard: 'bg-blue-900 text-white',
                      userButtonTrigger: 'hover:scale-110 transition-transform'
                    }
                  }} 
                />
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-6">
            <div className="flex flex-col space-y-3">
              {/* My Tickets button */}
              {isSignedIn && (
                <button
                  className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                    isActive("/my-tickets")
                      ? "bg-blue-700 ring-2 ring-blue-300"
                      : "hover:bg-blue-700 hover:cursor-pointer"
                  }`}
                  onClick={() => handleNavigation("/my-tickets")}
                >
                  <span className="text-white">{t.myTickets}</span>
                </button>
              )}
              
              <button
                className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                  isActive("/select-train")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:cursor-pointer"
                }`}
                onClick={() => handleNavigation("/select-train")}
              >
                <span className="text-white">{t.buyTickets}</span>
              </button>

              {/* Other navigation buttons */}
              <button 
              className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                isActive("/select-train")
                  ? "bg-blue-700 ring-2 ring-blue-300"
                  : "hover:bg-blue-700 hover:cursor-pointer"
              }`}
              onClick={() => handleNavigation("/station-center")}>
                <span className="text-white">{t.stationCenter}</span>
              </button>

              <button 
              className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                isActive("/select-train")
                  ? "bg-blue-700 ring-2 ring-blue-300"
                  : "hover:bg-blue-700 hover:cursor-pointer"
              }`}
              onClick={() => handleNavigation("/help")}>
                <span className="text-white">{t.helpCenter}</span>
              </button>

              <button
              className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                isActive("/select-train")
                  ? "bg-blue-700 ring-2 ring-blue-300"
                  : "hover:bg-blue-700 hover:cursor-pointer"
              }`}
               onClick={() => handleNavigation("/about-us")}>
                <span className="text-white">{t.aboutUs}</span>
              </button>

              <button
              className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                isActive("/select-train")
                  ? "bg-blue-700 ring-2 ring-blue-300"
                  : "hover:bg-blue-700 hover:cursor-pointer"
              }`}
               onClick={() => handleNavigation("/contact")}>
                <span className="text-white">{t.contact}</span>
              </button>

              <button
              className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                isActive("/select-train")
                  ? "bg-blue-700 ring-2 ring-blue-300"
                  : "hover:bg-blue-700 hover:cursor-pointer"
              }`}
               onClick={() => handleNavigation("/faqs")}>
                <span className="text-white">{t.faqs}</span>
              </button>

              {/* Role-specific buttons */}
              {isSignedIn && userRole === 'manager' && (
                <button
                className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                  isActive("/select-train")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:cursor-pointer"
                }`}
                 onClick={() => handleNavigation("/manager")}>
                  <span className="text-white">{t.manager}</span>
                </button>
              )}
              
              {isSignedIn && userRole === 'admin' && (
                <button
                className={`w-full px-4 py-3 rounded-md transition duration-200 ${
                  isActive("/select-train")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:cursor-pointer"
                }`}
                 onClick={() => handleNavigation("/admin")}>
                  <span className="text-white">{t.admin}</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-blue-700 text-center">
            <p className="text-sm text-blue-300">© {new Date().getFullYear()} {t.brandName}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNavigation;