import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Trusted from "../../components/Trusted";
import Featured from "../../components/Featured";
import WhyChoose from "../../components/WhyChoose";
import SpecialOffer from "../../components/SpecialOffer";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Featured />
      <WhyChoose />
      <SpecialOffer />
      <Testimonials />
      <Newsletter />
      <Footer/>
    </>
  );
}

export default Home;