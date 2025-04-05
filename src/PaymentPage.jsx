import { div } from "framer-motion/client"
import Footer from "./Footer"
import PaymentPage from "./Payment"
import ScrollToTop from "./Scroll"
import PopUp from './TrainRules.jsx';
import Navbar from "./Navbar"
function PaymentPageShow(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar />
            <PaymentPage/>
            <PopUp/>
            <Footer/>
        </div>
    )
}
export default PaymentPageShow