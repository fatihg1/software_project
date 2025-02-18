import { useState } from 'react'
import logo from "/TRAIN_LOGO-02.jpg"
import sidebar from "/sidebar-2.png"
function Navbar() {

    return (
        <div className="bg-blue-800 text-white fixed w-full p-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-row items-center space-x-4">
                            <img src={logo} className="h-8 w-8" alt="logo" />
                            <a href="#" className="text-2xl font-bold hover:medium">A-Train
                            </a>
                        </div>
                        <div className="hidden md:flex flex-row space-x-8 text-lg">
                            <a href="#" className="textShadow">Buy Tickets</a>
                            <a href="#" className="textShadow">Station Center</a>
                            <a href="#" className="textShadow">About Us</a>
                            <a href="#" className="textShadow">Contact</a>
                        </div>
                        <div className="flex flex-row space-x-8 text-md">
                            <button className="h-8 w-20 hover:bg-blue-900 hover:cursor-pointer rounded-lg">LOGIN</button>
                            <img src={sidebar} href="#" className="h-8 w-8 grayscale hover:cursor-pointer"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar