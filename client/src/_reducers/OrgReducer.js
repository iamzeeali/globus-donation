import * as types from "./../_actions/types";

const initialOrganisation = {
  organisation: null,
  organisations: [],
  allOrganisations: [],
  totalOrganisation: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialOrganisation, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ORGANISATION:
      return {
        ...state,
        organisation: payload,
        loading: false,
      };
    case types.GET_ORGANISATIONS:
      return {
        ...state,
        organisations: payload,
        loading: false,
      };

    case types.GET_ALL_ORGANISATIONS:
      return {
        ...state,
        allOrganisations: payload,
        loading: false,
      };
    case types.GET_TOTAL_ORGANISATION:
      return {
        ...state,
        totalOrganisation: payload,
        loading: false,
      };
    case types.ADD_ORGANISATION:
      return {
        ...state,
        organisation: payload,
        loading: false,
      };
    case types.SET_CURRENT_ORGANISATION:
      return {
        ...state,
        organisation: action.payload,
      };
    case types.CLEAR_ORGANISATION:
      return {
        ...state,
        organisation: null,
        organisations: [],
        loading: false,
      };

    case types.FILTER_ORGANISATION:
      return {
        ...state,
        filtered: state.allOrganisations.filter((org) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            org.orgName.match(regex) ||
            org.state.match(regex) ||
            org.city.match(regex)
          );
        }),
      };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_ORGANISATION:
      return {
        ...state,
        organisations: state.organisations.filter(
          (organisation) => organisation._id !== action.payload
        ),
        loading: false,
      };
    case types.ORGANISATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
