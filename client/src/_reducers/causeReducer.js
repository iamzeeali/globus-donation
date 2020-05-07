import * as types from "./../_actions/types";

const initialState = {
  cause: null,
  causes: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CAUSE:
      return {
        ...state,
        cause: payload,
        loading: false,
      };
    case types.GET_CAUSES:
      return {
        ...state,
        causes: payload.data,
        loading: false,
      };

    case types.ADD_CAUSE:
      return {
        ...state,
        cause: payload,
        loading: false,
      };
    case types.SET_CURRENT_CAUSE:
      return {
        ...state,
        cause: action.payload,
      };
    case types.CLEAR_CAUSE:
      return {
        ...state,
        cause: null,
        causes: [],
        loading: false,
      };

    case types.FILTER_CAUSE:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_CAUSE:
      return {
        ...state,
        causes: state.causes.filter((cause) => cause._id !== action.payload),
        loading: false,
      };
    case types.CAUSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
