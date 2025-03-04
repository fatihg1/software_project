import { div } from "framer-motion/client"
import Navbar from "./Navbar"
import Footer from "./Footer"
import PaymentPage from "./Payment"
import ScrollToTop from "./Scroll"

function PaymentPageShow(){
    return(
        <div>
            <ScrollToTop/>
            <Navbar/>
            <PaymentPage/>
            <Footer/>
        </div>
    )
}
export default PaymentPageShow