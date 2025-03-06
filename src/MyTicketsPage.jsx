import Navbar from "./Navbar";
import TicketDisplayPage from "./MyTickets";
import Footer from "./Footer";
import { div } from "framer-motion/client";
import ScrollToTop from "./Scroll";

function TicketsPage(){
  return(
    <div>
      <ScrollToTop/>
      <Navbar/>
      <TicketDisplayPage/>
      <Footer/>
    </div>
  )
}
export default TicketsPage