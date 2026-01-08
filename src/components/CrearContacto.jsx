import React, { useState, useEffect } from "react"; 
import { Link, useNavigate, useParams } from "react-router-dom"; 

export const CrearContacto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const slug = "vicente_castro_contactos";

    const [contacto, setContacto] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`)
                .then(resp => resp.json())
                .then(data => {
                    const encontrado = data.contacts.find(c => c.id == id);
                    if (encontrado) setContacto(encontrado);
                })
                .catch(error => console.error("Error cargando contacto:", error));
        }
    }, [id]);

    const handleSave = () => {
        if (contacto.name === "" || contacto.email === "") {
            alert("Nombre y Email son obligatorios");
            return;
        }

        const url = id 
            ? `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}` 
            : `https://playground.4geeks.com/contact/agendas/${slug}/contacts`;      

        const metodo = id ? "PUT" : "POST"; 

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacto) 
        })
        .then((resp) => {
            if (resp.ok) {
                navigate("/"); 
            } else {
                alert("Error al guardar el contacto");
            }
        })
        .catch((error) => console.error("Error al procesar:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{id ? "Editar contacto" : "Agrega un nuevo contacto"}</h1>
            
            <div className="inputs col-md-8 mx-auto">
                <p className="mb-1">Nombre Completo:</p>
                <input 
                    type="text" 
                    placeholder="Ingresa Nombre" 
                    className="form-control mb-3"
                    value={contacto.name}
                    onChange={(e) => setContacto({...contacto, name: e.target.value})}
                />
                
                <p className="mb-1">Correo:</p>
                <input 
                    type="email" 
                    placeholder="Ingresa Correo" 
                    className="form-control mb-3"
                    value={contacto.email}
                    onChange={(e) => setContacto({...contacto, email: e.target.value})}
                />

                <p className="mb-1">Teléfono:</p>
                <input 
                    type="text" 
                    placeholder="Ingresa Número" 
                    className="form-control mb-3"
                    value={contacto.phone}
                    onChange={(e) => setContacto({...contacto, phone: e.target.value})}
                />

                <p className="mb-1">Dirección:</p>
                <input 
                    type="text" 
                    placeholder="Ingresa Dirección" 
                    className="form-control mb-4"
                    value={contacto.address}
                    onChange={(e) => setContacto({...contacto, address: e.target.value})}
                />

                <button 
                    type="button" 
                    className="btn btn-primary w-100 mb-3"
                    onClick={handleSave} 
                >
                    {id ? "Actualizar cambios" : "Guardar"}
                </button>
                
                <div className="text-center">
                    <Link to="/">Volver a Contactos</Link>
                </div>
            </div>  
        </div>
    );
};