import StationCenter from "./StationCenter";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { div } from "framer-motion/client";
import ScrollToTop from "./Scroll";

function StationCenterPage(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar/>
            <StationCenter/>
            <div className="mt-65">
                <Footer/>
            </div>
            
        </div>
    )
}
export default StationCenterPage