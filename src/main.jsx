import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Navbar'
import AboutUs from './AboutUs';
import ContactUs from './contact';
import HomePage from './HomePage';
import Footer from './Footer';
import Visuals from './Visuals';
import Routes from './Routes';
import { ClerkProvider } from '@clerk/clerk-react';
const key='pk_test_aW5maW5pdGUtYmVlLTIwLmNsZXJrLmFjY291bnRzLmRldiQ'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <title>train ticket</title>
    </header>
    
    <Navbar />
    
    <Visuals/>
    <Routes/>
    <Footer />
  </StrictMode>
  ,
)
