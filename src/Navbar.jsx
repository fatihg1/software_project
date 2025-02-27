import { useNavigate, useLocation } from "react-router-dom";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import logo from "/TRAIN_LOGO-02.jpg";
import sidebar from "/sidebar-2.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-blue-800 text-white fixed w-full p-3 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-row w-full justify-between">
            {/* Left Section (Logo & Home Button) */}
            <div className="flex flex-row items-center space-x-4">
              <img
                src={logo}
                className="h-8 w-8 transition-transform duration-300 hover:scale-110"
                alt="logo"
              />
              <button
                className={`h-8 px-4 transition-all duration-200 rounded-lg ${
                  isActive("/")
                    ? "bg-blue-600 font-medium shadow-inner"
                    : "hover:bg-blue-700 hover:shadow"
                }`}
                onClick={() => navigate("/")}
              >
                A-Train
              </button>
            </div>

            {/* Middle Section (Navigation Links) */}
            <div className="hidden md:flex flex-row space-x-8 text-lg">
              {[
                { path: "/select-train", label: "Buy Tickets" },
                { path: "/station-center", label: "Station Center" },
                { path: "/about-us", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <button
                  key={path}
                  className={`h-8 px-4 transition-all duration-200 rounded-lg ${
                    isActive(path)
                      ? "bg-blue-600 font-medium shadow-inner"
                      : "hover:bg-blue-700 hover:shadow"
                  }`}
                  onClick={() => navigate(path)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Right Section (Authentication & Sidebar) */}
            <div className="flex flex-row space-x-6 text-md items-center">
              {/* Clerk Authentication Section */}
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <button
                  className="h-8 px-4 transition-all duration-200 bg-blue-700 hover:bg-blue-600 hover:shadow rounded-lg"
                  onClick={openSignIn}
                >
                  LOGIN
                </button>
              )}

              {/* Sidebar Icon */}
              <img
                src={sidebar}
                className="h-8 w-8 grayscale hover:grayscale-0 transition-all duration-300 hover:cursor-pointer"
                alt="menu"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
