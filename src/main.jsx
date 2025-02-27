import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./HomePage.jsx"
import Contact from './ContactPage.jsx'
import Aboutus from './AboutUsPage.jsx'
import TrainTicketSearch from './SearchTrain.jsx'
import TrainSearch from './stationcenter.jsx'
import Navbar from './Navbar.jsx'


const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/about-us',
      element:<Aboutus/>
    },
    {
      path:'/select-train',
      element:<TrainTicketSearch/>
    },
    { 
      path:'/station-center',
      element:<TrainSearch/>
    },
  ])
  
  // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>,
  )