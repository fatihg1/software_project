import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import React from 'react';
import HelpCenter from './HelpCenter.jsx';
import { Scroll } from 'lucide-react';

export default function HelpCenterPage() {
  return (
    <div>
        <Scroll/>
        <Navbar />
        <HelpCenter />
        <Footer />
    </div>
  );
}