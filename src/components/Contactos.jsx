import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Contactos = () => {

    const [lista, setLista] = useState([]);
    const slug = "vicente_castro_contactos";


 const crearAgenda = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
        method: "POST"
    })
    .then((resp) => {
        if (resp.ok) {
            console.log("¡Agenda creada con éxito!");
            return obtenerContactos(); 
        }
        if (resp.status === 400) {
            console.log("La agenda ya existe.");
            return obtenerContactos();
        }
        throw new Error("Error al crear la agenda: " + resp.status);
    })
    .catch((error) => console.error("Error en crearAgenda:", error));
};

const obtenerContactos = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
        .then((resp) => {
            if (resp.status === 404) {
                console.log("Agenda no encontrada (404), intentando crear...");
                crearAgenda();
                return null;
            }
            if (!resp.ok) throw Error("Error al obtener contactos: " + resp.status);
            return resp.json();
        })
        .then((data) => {
            if (data && data.contacts) {
                setLista(data.contacts);
                console.log("Contactos cargados:", data.contacts);
            }
        })
        .catch((error) => console.error("Error en obtenerContactos:", error));
};

    const borrarContacto = (id) => {
        fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    const nuevaLista = lista.filter((contacto) => contacto.id !== id);
                    setLista(nuevaLista);
                    console.log("Contacto eliminado correctamente");
                } else {
                    throw new Error("No se pudo eliminar el contacto de la API");
                }
            })
            .catch((error) => console.error("Error al borrar:", error));
    };
    useEffect(() => {
        obtenerContactos();
    }, []);

return (
    <div className="container">
        {lista.length > 0 ? (
            lista.map((contacto) => (
                <div className="card p-3 mb-3 d-flex flex-row align-items-center" key={contacto.id}>
                    
                    <img
                        src={`https://picsum.photos/seed/${contacto.id}/170/170`}
                        alt="imagen"
                        className="imagen rounded-circle"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />

                    <div className="nombre mx-5 mt-1">
                        <h4>{contacto.name}</h4>
                        <div className="datos mt-3">
                            <p className="mb-1"><i className="fas fa-map-marker-alt me-2"></i>{contacto.address}</p>
                            <p className="mb-1"><i className="fas fa-phone me-2"></i>{contacto.phone}</p>
                            <p className="mb-1"><i className="fas fa-envelope me-2"></i>{contacto.email}</p>
                        </div>
                    </div>

                    <div className="botones ms-auto align-self-start d-flex gap-5">
                        <Link to={`/edit/${contacto.id}`} className="btn bg-transparent border-0 p-0">
                            <i className="fas fa-pencil-alt text-dark"></i>
                        </Link>

                        <button
                            className="btn bg-transparent border-0 p-0"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
                                    borrarContacto(contacto.id);
                                }
                            }}
                        >
                            <i className="fas fa-trash-alt text-danger"></i>
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center mt-5">
                <h2>No hay contactos en tu agenda.</h2>
            </div>
        )}
    </div>
)};