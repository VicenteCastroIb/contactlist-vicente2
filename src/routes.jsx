import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { CrearContacto } from "./components/CrearContacto";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
        /* 
           AL QUITAR EL ELEMENTO PADRE QUE TENÍA LA NAVBAR, 
           CADA RUTA CARGARÁ SOLO LO QUE TÚ LE DIGAS.
        */
        <>
            {/* 1. La ruta principal con su Navbar y Lista */}
            <Route path="/" element={<Home />} />

            {/* 2. La ruta de crear, totalmente sola (sin Navbar) */}
            <Route path="/crearcontacto" element={<CrearContacto />} />

            {/* 3. Otras rutas */}
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="edit/:id" element={<CrearContacto />} />
            <Route path="*" element={<h1>Not found!</h1>} />
        </>
    )
);