import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addContact, updateContact } from "../services/contactAPI.js";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (store.currentContact) {
      setContact(store.currentContact);
    }
  }, [store.currentContact]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;

    if (store.currentContact) {
      success = await updateContact(dispatch, store.currentContact.id, contact);
    } else {
      success = await addContact(dispatch, contact);
    }

    if (success) {
      dispatch({ type: "setCurrentContact", payload: null });
      navigate("/");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 px-4 py-5 mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="text-center fw-bold mb-4">{store.currentContact ? "Actualizar Contacto" : "Crear Contacto"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label fw-semibold">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              className="form-control py-2"
              placeholder="Ingresa el nombre completo"
              value={contact.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Correo Electronico
            </label>
            <input
              type="email"
              name="email"
              className="form-control py-2"
              placeholder="Ingresa el correo electronico"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="form-label fw-semibold">
              Numero de Telefono
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control py-2"
              placeholder="Ingresa el numero de telefono"
              value={contact.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="form-label fw-semibold">
              Direccion
            </label>
            <input
              type="text"
              name="address"
              className="form-control py-2"
              placeholder="Ingresa la direccion"
              value={contact.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg fw-bold py-3 mt-4">
              {store.currentContact ? "Actualizar" : "Guardar"}
            </button>
            <Link to="/" className="text-center mt-3 text-muted" onClick={() => dispatch({ type: "setCurrentContact", payload: null })}>
              Volver a Contactos
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
