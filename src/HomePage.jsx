import Visuals from "./Visuals"
import Navbar from "./Navbar"
import Routes from "./Routes"
import Footer from "./Footer"
import Announcements from "./Announcements.jsx"
import { AnnouncementsProvider } from "./AnnouncementsContext.jsx"
import Weather from "./Weather.jsx"

function Home(){
  return(
    <AnnouncementsProvider>
      <div>
        <Navbar/>
        <Visuals/>
        <Routes/>
        <Weather/>
        <Announcements/>
        <Footer/>
      </div>
    </AnnouncementsProvider>
  )
}
export default Home