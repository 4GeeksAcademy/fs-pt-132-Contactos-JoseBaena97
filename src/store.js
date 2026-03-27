import { func } from "prop-types"

export const initialStore = () => {
  return {
    message: null,
    agendas: [],
    contacts: [],
    todos:[],
  }
}

export default function storeReducer(store, action = {}){
  switch (action.type) {
    case 'setAgendas':
      return {
        ...store,
        agendas: action.payload
      };

    case 'selectAgenda':
      return {
        ...store,
        currentAgenda: action.payload
      };

    case 'setContact':
      return {
        ...store,
        contacts: action.payload
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