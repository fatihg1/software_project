import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./HomePage.jsx"
import Contact from './ContactPage.jsx'
import Aboutus from './AboutUsPage.jsx'
import TrainTicketSearch from './SearchTrain.jsx'
import StationCenterPage from './StationCenterPage.jsx'
import Navbar from './Navbar.jsx'
import ManagerDashboard from "./Manager/ManagerDashboard.jsx"; 
import TrainManagement from "./Admin/TrainManagement.jsx"; 
import UserManagement from "./Manager/UserManagement.jsx";
import BookingManagement from "./Admin/BookingManagement.jsx";
import FinanceManagement from "./Manager/FinanceManagement.jsx";
import AnnouncementManagement from "./Admin/AnnouncementManagement.jsx"; 
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import RevenueAnalysis from "./Manager/RevenueAnalysis.jsx";
import SalaryManagement from "./Manager/SalaryManagement.jsx";
import TrainSeatSelection from './Seat.jsx'
import PaymentPage from './Payment.jsx'
import SearchTrainPage from './SearchTrainPage.jsx'
import SeatPage from './SeatPage.jsx'
import PaymentPageShow from './PaymentPage.jsx'
import NotFound from './ErrorPage.jsx'
import HelpCenter from './HelpCenterPage.jsx'
import TrainRules from './TrainRulesPage.jsx'
import TicketsPage from './MyTicketsPage.jsx'
import FAQsPage from './FAQsPage.jsx'
import AdminRoute from './AdminRoute.jsx'
import ManagerRoute from './ManagerRoute.jsx'
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
      element:<StationCenterPage/>
    },
    {
      path:'/admin', // Admin Paneli
      element:<AdminRoute/>,
      children:[
        {
          index:true,
          element:<AdminDashboard/>,
        },
        { 
          path: "/admin/trains",
          element: <TrainManagement /> 
        },
        {
          path:"/admin/bookings",
          element:<BookingManagement/>
        },
        { 
          path:'/admin/announcements',
          element:<AnnouncementManagement/> 
        },
      ]
      
    },
    {
      path:"/rules",
      element:<TrainRules/>
    },
    {
      path:"/my-tickets",
      element:<TicketsPage/>
    },
    { 
      path:'/help',
      element:<HelpCenter/>
    },
    {
      path:'/*',
      element:<NotFound/>
    },
    {
      path:"/manager",
      element:<ManagerRoute/>,
      children:[
        {
          index:true,
          element:<ManagerDashboard/>
        },
        {
          path:"/manager/revenue",
          element:<RevenueAnalysis/>
        },
        {
          path:"/manager/salary",
          element:<SalaryManagement/>
        },
        {
          path:"/manager/finance",
          element:<FinanceManagement/>
        },
        { 
          path:'/manager/users', 
          element:<UserManagement/> 
        },
      ]
    },
    {
      path: '/faqs',  
      element: <FAQsPage />
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
