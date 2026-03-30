import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact, onDelete }) => {
  const { dispatch } = useGlobalReducer();

  const handleEdit = () => {
    dispatch({ type: "setCurrentContact", payload: contact });
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0 align-items-center p-3">
        <div className="col-md-2 text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${contact.name}&background=random&size=100`}
            className="rounded-circle img-fluid contact-avatar"
            alt={contact.name}
          />
        </div>
        <div className="col-md-7">
          <div className="card-body d-flex align-items-start flex-column">
            <h5 className="card-title fw-bold mb-1">{contact.name}</h5>
            <p className="card-text mb-1 text-muted">
              <i className="fa-solid fa-location-dot me-2"></i>
              {contact.address}
            </p>
            <p className="card-text mb-1 text-muted">
              <i className="fa-solid fa-phone me-2"></i>
              {contact.phone}
            </p>
            <p className="card-text mb-1 text-muted">
              <i className="fa-solid fa-envelope me-2"></i>
              {contact.email}
            </p>
          </div>
        </div>
        <div className="col-md-3 text-end pe-4">
          <Link
            to="/add-contact"
            className="btn btn-link text-dark p-2"
            onClick={handleEdit}
          >
            <i className="fa-solid fa-pencil"></i>
          </Link>
          <button
            className="btn btn-link text-dark p-2"
            onClick={() => onDelete(contact.id)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object,
  onDelete: PropTypes.func,
};
