import * as types from "./../_actions/types";

const initialContact = {
  contact: null,
  contacts: [],
  allContacts: [],
  totalContact: [],
  contact_length: null,
  sendingLoader: false,
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialContact, action) {
  const { type, payload, sendingPayload } = action;

  switch (type) {
    case types.GET_CONTACTUS:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case types.GET_CONTACTUSS:
      return {
        ...state,
        contacts: payload.data,
        contact_length: payload.result,
        loading: false,
      };

    case types.GET_ALL_CONTACTUS:
      return {
        ...state,
        allContacts: payload,
        loading: false,
      };
    case types.GET_TOTAL_CONTACTUS:
      return {
        ...state,
        totalContact: payload,
        loading: false,
      };
    case types.ADD_CONTACTUS:
      return {
        ...state,
        contact: payload,
        loading: false,
        sendingLoader: sendingPayload,
      };
    case types.SET_CURRENT_CONTACTUS:
      return {
        ...state,
        contact: action.payload,
      };
    case types.CLEAR_CONTACTUS:
      return {
        ...state,
        contact: null,
        contacts: [],
        loading: false,
      };

    // case types.FILTER_STAFF:
    //   return {
    //   ...state,
    //     filtered: contact.contacts.filter(contact => {
    //       const regex = new RegExp(`${action.payload}`, "gi");
    //       return (
    //         staff.firstName.match(regex) ||
    //         staff.lastName.match(regex) ||
    //         staff.email.match(regex) ||
    //         staff.mobile.match(regex) ||
    //         staff.username.match(regex)
    //       );
    //     })
    //   };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_CONTACTUS:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };
    case types.CONTACTUS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
