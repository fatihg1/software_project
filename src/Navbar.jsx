import { useState } from 'react';
import { SignIn, useClerk, UserButton } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import logo from '/TRAIN_LOGO-02.png';
import profile from '/user.png';
import Sidebar from './Sidebar';
import MultilingualComponent from './MultiLingual.jsx';
import {useLanguage} from './LanguageContext.jsx';
import translations from './translations.jsx';
import { useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  // Scroll to top and navigate
  const handleNavigation = (path, options) => {
    navigate(path, options);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const isInTicketFlow = () => {
    return ['/select-train', '/select-seats', '/payment'].includes(location.pathname);
  };

  // Handle Buy Tickets button click
  const handleBuyTicketsClick = () => {
    if (!isInTicketFlow()) {
      navigate("/select-train");
    }
  };
  
  // Function to get user role from metadata
  const getUserRole = () => {
    if (!isSignedIn || !user) return null;
    
    // Assuming role is stored in publicMetadata
    // Modify this according to where you store role information in Clerk
    return user.publicMetadata.role;
  };
  
  const userRole = getUserRole();

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white fixed w-full p-3 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-row w-full justify-between h-full">
            {/* Left section: Logo and Brand - Always visible */}
            <div className="flex flex-row items-center space-x-4">
              {/* Logo Container */}
              <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Company Logo"
                  className="w-full h-full object-cover hover:cursor-pointer"
                  onClick={() => handleNavigation("/")}
                />
              </div>

              {/* Brand Name */}
              <button
                className={`text-2xl font-bold transition duration-300 hover:cursor-pointer ${
                  isActive("/") ? "text-blue-300" : "hover:text-blue-300"
                }`}
                onClick={() => handleNavigation("/")}
              >
                Rail Link
              </button>
            </div>

            {/* Middle section: Navigation Links */}
            <div className="hidden xl:flex flex-row space-x-4 text-md items-center">
              {/* My Tickets button - Only visible to signed-in users */}
              {isSignedIn && (
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isActive("/my-tickets")
                      ? "bg-blue-700 ring-2 ring-blue-300"
                      : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                  }`}
                  onClick={() => handleNavigation("/my-tickets", { state: { fromMyTickets: true } })}
                >
                  <span className="text-white textShadow">{translations[language].myTickets}</span>
                </button>
              )}

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isInTicketFlow("/select-train")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                }`}
                onClick={() => handleBuyTicketsClick("/select-train")}
              >
                <span className="text-white textShadow">{translations[language].buyTickets}</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/station-center")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                }`}
                onClick={() => handleNavigation("/station-center")}
              >
                <span className="text-white textShadow">{translations[language].stationCenter}</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/help")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                }`}
                onClick={() => handleNavigation("/help")}
              >
                <span className="text-white textShadow">{translations[language].helpCenter}</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/about-us")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                }`}
                onClick={() => handleNavigation("/about-us")}
              >
                <span className="text-white textShadow">{translations[language].about}</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/contact")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                }`}
                onClick={() => handleNavigation("/contact")}
              >
                <span className="text-white textShadow">{translations[language].contact}</span>
              </button>
              
              {/* Role-specific buttons */}
              {isSignedIn && userRole === 'manager' && (
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isActive("/manager")
                      ? "bg-blue-700 ring-2 ring-blue-300"
                      : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                  }`}
                  onClick={() => handleNavigation("/manager")}
                >
                  <span className="text-white textShadow">{translations[language].manager}</span>
                </button>
              )}
              
              {isSignedIn && userRole === 'admin' && (
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isActive("/admin")
                      ? "bg-blue-700 ring-2 ring-blue-300"
                      : "hover:bg-blue-700 hover:translate-y-[-2px] hover:cursor-pointer"
                  }`}
                  onClick={() => handleNavigation("/admin")}
                >
                  <span className="text-white textShadow">{translations[language].admin}</span>
                </button>
              )}
            </div>
              
            {/* Right section: Profile + Sidebar*/}
            <div className="flex items-center space-x-4">
              {/* User Profile Button */}
              <MultilingualComponent/>
              <div className="">
                {!isSignedIn ? (
                  <div 
                    className="p-2 mr-5 rounded-full hover:bg-blue-700 transition duration-200"
                    onClick={() => openSignIn()}
                  >
                    <img
                      src={profile}
                      className="h-8 w-8 hover:cursor-pointer transition-transform duration-200 hover:scale-110"
                      alt="Sign In"
                    />
                  </div>
                ) : (
                  <div className="mr-5">
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

              {/* Sidebar Toggle - Always visible */}
              <div className="flex items-center xl:hidden">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;