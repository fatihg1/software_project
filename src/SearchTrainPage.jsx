
import Navbar from "./Navbar"
import TrainTicketSearch from "./SearchTrain"
import Footer from "./Footer"
import ScrollToTop from "./Scroll"

function SearchTrainPage(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar/>
            <div className="pt-12">
                <TrainTicketSearch/>
            </div>
            <Footer/>
        </div>
    )
}
export default SearchTrainPage