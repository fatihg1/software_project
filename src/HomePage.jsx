import Visuals from "./Visuals"
import Navbar from "./Navbar"
import { div } from "framer-motion/client"
import Routes from "./Routes"
import Footer from "./Footer"


function Home(){
  return(
    <div>
      <Navbar/>
      <Visuals/>
      <Routes/>
      <Footer/>
    </div>

  )
}
export default Home