import { div } from "framer-motion/client"
import Footer from "./Footer"
import PaymentPage from "./Payment"
import ScrollToTop from "./Scroll"
import PopUp from './TrainRules.jsx';

function PaymentPageShow(){
    return(
        <div>
            <ScrollToTop/>
            <PaymentPage/>
            <PopUp/>
            <Footer/>
        </div>
    )
}
export default PaymentPageShow