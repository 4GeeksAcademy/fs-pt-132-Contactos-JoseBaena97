import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts, deleteContact } from "../services/contactAPI.js";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    getContacts(dispatch);
  }, []);

  const handleDeleteRequest = (id) => {
    setContactToDelete(id);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Lista de Contactos</h1>
        <Link
          to="/add-contact"
          className="btn btn-success px-4 py-2 fw-semibold"
          onClick={() => dispatch({ type: "setCurrentContact", payload: null })}
        >
          Crear Contacto
        </Link>
      </div>

      <div className="row">
        <div className="col-12">
          {store.contacts && store.contacts.length > 0 ? (
            store.contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleDeleteRequest}
              />
            ))
          ) : (
            <div className="alert alert-info py-4 text-center">
              No tienes contactos agregados <i className="fa-regular fa-face-frown"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};