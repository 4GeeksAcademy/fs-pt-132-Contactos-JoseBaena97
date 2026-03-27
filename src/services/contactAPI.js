const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "josebaena97";

export const getContacts = async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
    if (response.status === 404) {
      await createAgenda();
      return getContacts(dispatch);
    }
    const data = await response.json();
    dispatch({ type: "setContacts", payload: data.contacts });
  } catch (error) {
    console.error("Error al obtener contactos:", error);
  }
};

export const createAgenda = async () => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`, {
      method: "POST",
    });
    if (response.ok) {
      console.log("Agenda creada!");
    }
  } catch (error) {
    console.error("Error al crear la agenda:", error);
  }
};

export const addContact = async (dispatch, contact) => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    if (response.ok) {
      await getContacts(dispatch);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    return false;
  }
};

export const updateContact = async (dispatch, contactId, contact) => {
  try {
    const response = await fetch(
      `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }
    );
    if (response.ok) {
      await getContacts(dispatch);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al actualizar contacto:", error);
    return false;
  }
};

export const deleteContact = async (dispatch, contactId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      dispatch({ type: "deleteContact", payload: contactId });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
    return false;
  }
};
