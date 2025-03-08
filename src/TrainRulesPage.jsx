import React from 'react';
import Rules from './Rules.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function TrainRules(){

    return(
        <div>
            <Navbar/>
            <div className="h-30"></div>
            <Rules/>
            <div className='h-10'></div>
            <Footer/>
        </div>
    )
}

export default TrainRules;