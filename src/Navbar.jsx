import { useState } from 'react'
import logo from "/TRAIN_LOGO-02.jpg"
import sidebar from "/sidebar-2.png"
import { useNavigate, useLocation } from "react-router-dom";
import { UserButton, useUser, useClerk } from '@clerk/clerk-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  
  // Helper function to check if a route is active
  const isActive = (path) => location.pathname === path;
  
  // Helper to check if we're in any part of the ticket purchase flow
  const isInTicketFlow = () => {
    return ['/select-train', '/select-seats', '/payment'].includes(location.pathname);
  };
  
  // Handle Buy Tickets button click
  const handleBuyTicketsClick = () => {
    if (!isInTicketFlow()) {
      navigate("/select-train");
    }
    // Do nothing if already in the ticket flow
  };

  return (
    <div className="bg-blue-800 text-white fixed w-full p-3 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row items-center space-x-4">
              <img
                src={logo}
                className="h-8 w-8 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                alt="logo"
              />
              <button
                className={`h-8 px-4 transition-all duration-200 rounded-lg relative overflow-hidden ${
                  isActive("/")
                    ? "bg-blue-600 font-medium shadow-inner"
                    : "hover:bg-blue-700 before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity"
                }`}
                onClick={() => navigate("/")}
              >
                A-Train
              </button>
            </div>
            <div className="hidden md:flex flex-row space-x-8 text-lg">
              <button
                className={`h-8 px-4 transition-all duration-300 rounded-lg relative overflow-hidden ${
                  isInTicketFlow()
                    ? "bg-blue-600 font-medium shadow-inner"
                    : "hover:bg-blue-700 before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity hover:translate-y-[-2px]"
                }`}
                onClick={handleBuyTicketsClick}
              >
                Buy Tickets
              </button>
              <button
                className={`h-8 px-4 transition-all duration-300 rounded-lg relative overflow-hidden ${
                  isActive("/station-center")
                    ? "bg-blue-600 font-medium shadow-inner"
                    : "hover:bg-blue-700 before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity hover:translate-y-[-2px]"
                }`}
                onClick={() => navigate("/station-center")}
              >
                Station Center
              </button>
              <button
                className={`h-8 px-4 transition-all duration-300 rounded-lg relative overflow-hidden ${
                  isActive("/about-us")
                    ? "bg-blue-600 font-medium shadow-inner"
                    : "hover:bg-blue-700 before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity hover:translate-y-[-2px]"
                }`}
                onClick={() => navigate("/about-us")}
              >
                About Us
              </button>
              <button
                className={`h-8 px-4 transition-all duration-300 rounded-lg relative overflow-hidden ${
                  isActive("/contact")
                    ? "bg-blue-600 font-medium shadow-inner"
                    : "hover:bg-blue-700 before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity hover:translate-y-[-2px]"
                }`}
                onClick={() => navigate("/contact")}
              >
                Contact
              </button>
            </div>
            <div className="flex flex-row space-x-8 text-md items-center">
              <button
                className="h-8 px-4 transition-all duration-300 bg-blue-700 rounded-lg relative overflow-hidden hover:bg-blue-600 hover:shadow-md hover:translate-y-[-2px] before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity"
                onClick={() => {
                  openSignIn();
                }}
              >
                LOGIN
              </button>
              <img
                src={sidebar}
                className="h-8 w-8 grayscale hover:grayscale-0 transition-all duration-300 hover:cursor-pointer hover:scale-110"
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