import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	return (
		<div className="header">
			<h2 className="titulo">Contactos</h2>
			<button className="boton btn btn-success" onClick={() => navigate("/crearcontacto")}>Crear Nuevo Contacto</button>
		</div>
	);
};