import * as types from "../_actions/types";

const initialGrocery = {
  grocery: null,
  grocerys: [],
  allGrocerys: [],
  totalGrocery: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialGrocery, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_GROCERY:
      return {
        ...state,
        grocery: payload,
        loading: false,
      };
    case types.GET_GROCERYS:
      return {
        ...state,
        grocerys: payload,
        loading: false,
      };

    case types.GET_ALL_GROCERYS:
      return {
        ...state,
        allGrocerys: payload,
        loading: false,
      };
    case types.GET_TOTAL_GROCERY:
      return {
        ...state,
        totalGrocery: payload,
        loading: false,
      };
    case types.ADD_GROCERY:
      return {
        ...state,
        grocery: payload,
        loading: false,
      };
    case types.SET_CURRENT_GROCERY:
      return {
        ...state,
        grocery: action.payload,
      };
    case types.CLEAR_GROCERY:
      return {
        ...state,
        grocery: null,
        grocerys: [],
        loading: false,
      };

    // case types.FILTER_STAFF:
    //   return {
    //   ...state,
    //     filtered: grocery.grocerys.filter(grocery => {
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
    case types.DELETE_GROCERY:
      return {
        ...state,
        grocerys: state.grocerys.filter(
          (grocery) => grocery._id !== action.payload
        ),
        loading: false,
      };
    case types.GROCERY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
