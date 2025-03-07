import { useState } from 'react';
import { SignIn, useClerk, UserButton } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import logo from '/TRAIN_LOGO-02.png';
import profile from '/user.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    // Modify this according to where you store role information in Clerk
    return user.publicMetadata.role;
  };
  
  const userRole = getUserRole();

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white fixed w-full p-3 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-row w-full justify-between h-full">
            {/* Logo and Brand */}
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




            {/* Navigation Links */}
            <div className="hidden md:flex flex-row space-x-4 text-md items-center">
              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/select-train")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px]"
                }`}
                onClick={() => handleNavigation("/select-train")}
              >
                <span className="text-white textShadow">Buy Tickets</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/station-center")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px]"
                }`}
                onClick={() => handleNavigation("/station-center")}
              >
                <span className="text-white textShadow">Station Center</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/help-center")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px]"
                }`}
                onClick={() => handleNavigation("/help")}
              >
                <span className="text-white textShadow">Help Center</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/about-us")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px]"
                }`}
                onClick={() => handleNavigation("/about-us")}
              >
                <span className="text-white textShadow">About Us</span>
              </button>

              <button
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  isActive("/contact")
                    ? "bg-blue-700 ring-2 ring-blue-300"
                    : "hover:bg-blue-700 hover:translate-y-[-2px]"
                }`}
                onClick={() => handleNavigation("/contact")}
              >
                <span className="text-white textShadow">Contact</span>
              </button>
              
              {/* Role-specific buttons */}
              {isSignedIn && userRole === 'manager' && (
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isActive("/manager")
                      ? "bg-blue-700 ring-2 ring-blue-300"
                      : "hover:bg-blue-700 hover:translate-y-[-2px]"
                  }`}
                  onClick={() => handleNavigation("/manager")}
                >
                  <span className="text-white textShadow">Manager</span>
                </button>
              )}
              
              {isSignedIn && userRole === 'admin' && (
                <button
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    isActive("/admin")
                      ? "bg-blue-700 ring-2 ring-blue-300"
                      : "hover:bg-blue-700 hover:translate-y-[-2px]"
                  }`}
                  onClick={() => handleNavigation("/admin")}
                >
                  <span className="text-white textShadow">Admin</span>
                </button>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative flex flex-row items-center space-x-4">
              {/* Conditional Rendering for Authentication */}
              {!isSignedIn ? (
                <div 
                  className="p-2 rounded-full hover:bg-blue-700 transition duration-200"
                  onClick={() => openSignIn()}
                >
                  <img
                    src={profile}
                    className="h-8 w-8 hover:cursor-pointer transition-transform duration-200 hover:scale-110"
                    alt="Sign In"
                  />
                </div>
              ) : (
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonPopoverCard: 'bg-blue-900 text-white',
                      userButtonTrigger: 'hover:scale-110 transition-transform'
                    }
                  }} 
                />
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle (Optional - you can expand this) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;