import { func } from "prop-types"

export const initialStore = () => {
  return {
    contacts: [],
    currentContact: null,
  }
}

export default function storeReducer(store, action = {}){
  switch (action.type) {
    case 'setContacts':
      return {
        ...store,
        contacts: action.payload
      };

    case 'setCurrentContact':
      return {
        ...store,
        currentContact: action.payload
      };

    case 'deleteContact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };

    default:
      return store;
  }
}