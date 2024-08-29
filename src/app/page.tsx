
import About from "@/components/layouts/about";
import ContactPage from "@/components/layouts/contactus";

import Dinning from "@/components/layouts/dinning";
import Footers from "@/components/layouts/footer";

import HomePage from "@/components/layouts/home";
import Menu from "@/components/layouts/menu";

import Reservation from "@/components/layouts/reservation";
import ServicesSection from "@/components/layouts/services";




export default function Home() {
  return (
    <>
    {/* <Navbar/> */}
    <HomePage/>
    {/* <Homes/> */}
    <About/>
    <Menu/>
    {/* <Gallery/> */}
    <ServicesSection/>
    <Dinning/>
    {/* <ContactUs/> */}
    <Reservation/>
    <ContactPage/>
    <Footers/>
  
    </>
  );
}
