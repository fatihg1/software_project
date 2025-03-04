import TrainSeatSelection from "./Seat"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "./Scroll"


function SeatPage(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar/>
            <TrainSeatSelection/>
            <Footer/>
        </div>
    )
}
export default SeatPage