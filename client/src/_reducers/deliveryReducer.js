import * as types from "./../_actions/types";

const initialRation = {
  ration: null,
  rations: [],
  allRations: [],
  totalRation: [],
  error: {},
  filtered: null,
  loading: true,
  deliveries: [],
};

export default function (state = initialRation, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_RATION:
      return {
        ...state,
        ration: payload,
        loading: false,
      };
    case types.GET_RATIONS:
      return {
        ...state,
        rations: payload,
        loading: false,
      };
    case types.SEARCH_DELIVERY:
      return {
        ...state,
        deliveries: payload.data,
        loading: false,
      };

    case types.GET_ALL_RATIONS:
      return {
        ...state,
        allRations: payload,
        loading: false,
      };
    case types.GET_TOTAL_RATION:
      return {
        ...state,
        totalRation: payload,
        loading: false,
      };
    case types.ADD_RATION:
      return {
        ...state,
        ration: payload,
        loading: false,
      };
    case types.SET_CURRENT_RATION:
      return {
        ...state,
        ration: action.payload,
      };
    case types.CLEAR_RATION:
      return {
        ...state,
        ration: null,
        rations: [],
        loading: false,
      };

    // case types.FILTER_STAFF:
    //   return {
    //   ...state,
    //     filtered: ration.rations.filter(ration => {
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
    case types.DELETE_RATION:
      return {
        ...state,
        rations: state.rations.filter(
          (ration) => ration._id !== action.payload
        ),
        loading: false,
      };
    case types.RATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
