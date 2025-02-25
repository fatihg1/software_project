import { useState } from 'react';
import { SignIn, useClerk } from '@clerk/clerk-react';
import logo from '/TRAIN_LOGO-02.jpg';
import profile from '/user.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-blue-800 text-white fixed w-full p-3 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row items-center space-x-4">
              <img src={logo} className="h-8 w-8" alt="logo" />
              <a href="#" className="text-2xl font-bold hover:medium">A-Train</a>
            </div>
            <div className="hidden md:flex flex-row space-x-8 text-lg">
              <a href="#" className="textShadow">Buy Tickets</a>
              <a href="#" className="textShadow">Station Center</a>
              <a href="#" className="textShadow">About Us</a>
              <a href="#" className="textShadow">Contact</a>
            </div>
            <div className="relative flex flex-row space-x-8 text-md">
              <img
                src={profile}
                className="h-8 w-8 grayscale hover:cursor-pointer"
                onClick={handleProfileClick}
                alt="profile"
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => openSignIn({})}
                  >
                    Sign In
                  </button>
                  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;