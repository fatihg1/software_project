import StationCenter from "./StationCenter";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./Scroll";

function StationCenterPage(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar/>
            <StationCenter/>
            <div className="mt-75">
                <Footer/>
            </div>
            
        </div>
    )
}
export default StationCenterPage
