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
import ManagerDashboard from "./Manager/ManagerDashboard.jsx"; 
import TrainManagement from "./Admin/TrainManagement.jsx"; 
import UserManagement from "./Manager/UserManagement.jsx";
import BookingManagement from "./Admin/BookingManagement.jsx";
import FinanceManagement from "./Manager/FinanceManagement.jsx";
import AnnouncementManagement from "./Admin/AnnouncementManagement.jsx"; 
import TrainSeatSelection from './Seat.jsx'
import PaymentPage from './Payment.jsx'
import SearchTrainPage from './SearchTrainPage.jsx'
import SeatPage from './SeatPage.jsx'
import PaymentPageShow from './PaymentPage.jsx'
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import SalaryManagement from './Manager/SalaryManagement.jsx'
import RevenueAnalysis from './Manager/RevenueAnalysis.jsx'




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
      path:'/manager', // manager Paneli
      element:<ManagerDashboard/>
    },
    { 
      path: "/admin/trains",
      element: <TrainManagement /> 
    }, 
    { 
      path:'/manager/users', 
      element:<UserManagement/> 
    },
    {
      path:"/admin/bookings",
      element:<BookingManagement/>
    },
    {
      path:"/manager/finance",
      element:<FinanceManagement/>
    },
    { 
      path:'/admin/announcements',
      element:<AnnouncementManagement/> 
    },
    {
      path: '/admin', // Admin Paneli
      element: <AdminDashboard/>
    },
    {
      path: '/manager/salary',
      element: <SalaryManagement/>
    },
    {
      path: '/manager/revenue',
      element: <RevenueAnalysis/>
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