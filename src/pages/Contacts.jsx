import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts, deleteContact } from "../services/contactAPI.js";
import { ContactCard } from "../components/ContactCard";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [contactToDelete, setContactToDelete] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    getContacts(dispatch);
  }, []);

  const handleDeleteRequest = (id) => {
    setContactToDelete(id);
    const modalElement = modalRef.current;
    const bsModal = new window.bootstrap.Modal(modalElement);
    bsModal.show();
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      await deleteContact(dispatch, contactToDelete);
      const modalElement = modalRef.current;
      const bsModal = window.bootstrap.Modal.getInstance(modalElement);
      bsModal.hide();
      setContactToDelete(null);
    }
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
      <div className="modal fade" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">¿Borrar contacto?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>El contacto se eliminará para siempre!!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar definitivamente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};