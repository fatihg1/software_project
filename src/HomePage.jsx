import Visuals from "./Visuals"
import Navbar from "./Navbar"
import Routes from "./Routes"
import Footer from "./Footer"
import Announcements from "./Announcements.jsx"
import { AnnouncementsProvider } from "./AnnouncementsContext.jsx"

function Home(){
  return(
    <AnnouncementsProvider>
      <div>
        <Navbar/>
        <Visuals/>
        <Routes/>
        <Announcements/>
        <Footer/>
      </div>
    </AnnouncementsProvider>
  )
}
export default Home