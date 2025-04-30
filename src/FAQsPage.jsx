import Navbar from "./Navbar"
import Footer from "./Footer"
import FAQs1 from "./FAQs1"
import ScrollToTop from "./Scroll"

function FAQs() {
    return (
      <div className="flex flex-col min-h-screen"> {/* Ensure full height for layout */}
        <Navbar/>
        <div className="flex-grow pt-20"> {/* Push content down only here */}
          <ScrollToTop/>
          <FAQs1/>
        </div>
        <Footer/>
      </div>
    )
}

export default FAQs;
