
import Navbar from "./Navbar"
import TrainTicketSearch from "./SearchTrain"
import Footer from "./Footer"
import ScrollToTop from "./Scroll"

function SearchTrainPage(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar/>
            <TrainTicketSearch/>
            <Footer/>
        </div>
    )
}
export default SearchTrainPage