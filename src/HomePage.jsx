import Visuals from "./Visuals"
import Navbar from "./Navbar"
import { div } from "framer-motion/client"
import Routes from "./Routes"
import Footer from "./Footer"
import ScrollToTop from "./Scroll"


function Home(){
  return(
    <div>
      <ScrollToTop/>
      <Navbar/>
      <Visuals/>
      <Routes/>
      <Footer/>
    </div>

  )
}
export default Home