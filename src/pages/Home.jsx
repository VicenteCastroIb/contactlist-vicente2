import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Contactos } from "../components/Contactos"
import { Outlet } from "react-router-dom";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Home = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <Contactos />
        </ScrollToTop>
    )
}