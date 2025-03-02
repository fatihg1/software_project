import { div } from "framer-motion/client"
import Navbar from "./Navbar"
import Footer from "./Footer"
import PaymentPage from "./Payment"

function PaymentPageShow(){
    return(
        <div>
            <Navbar/>
            <PaymentPage/>
            <Footer/>
        </div>
    )
}
export default PaymentPageShow