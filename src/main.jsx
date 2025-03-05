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
import ManagerDashboard from "./ManagerDashboard"; 
import TrainManagement from "./TrainManagement"; 
import UserManagement from "./userManagement";
import BookingManagement from "./BookingManagement";
import FinanceManagement from "./FinanceManagement";
import AnnouncementManagement from "./AnnouncementManagement"; 
import TrainSeatSelection from './Seat.jsx'
import PaymentPage from './Payment.jsx'
import SearchTrainPage from './SearchTrainPage.jsx'
import SeatPage from './SeatPage.jsx'
import PaymentPageShow from './PaymentPage.jsx'
import NotFound from './ErrorPage.jsx'





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
      element:<SearchTrainPage/>
    },
    {
      path:'/select-seats',
      element:<SeatPage/>
    },
    {
      path:'/payment',
      element:<PaymentPageShow/>
    },
    { 
      path:'/station-center',
      element:<TrainSearch/>
    },
    {
      path:'/admin', // Admin Paneli
      element:<ManagerDashboard/>
    },
    { 
      path: "/admin/trains",
      element: <TrainManagement /> 
    }, 
    { 
      path:'/admin/users', 
      element:<UserManagement/> 
    },
    {
      path:"/admin/bookings",
      element:<BookingManagement/>
    },
    {
      path:"/admin/finance",
      element:<FinanceManagement/>
    },
    { 
      path:'/admin/announcements',
      element:<AnnouncementManagement/> 
    },
    {
      path:'/*',
      element:<NotFound/>
    }
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