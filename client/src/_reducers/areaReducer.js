import * as types from "./../_actions/types";

const initialState = {
  area: null,
  areas: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_AREA:
      return {
        ...state,
        area: payload.data,
        loading: false,
      };
    case types.GET_AREAS:
      return {
        ...state,
        areas: payload.data,
        loading: false,
      };

    case types.ADD_AREA:
      return {
        ...state,
        area: payload,
        loading: false,
      };
    case types.SET_CURRENT_AREA:
      return {
        ...state,
        area: action.payload,
      };
    case types.CLEAR_AREA:
      return {
        ...state,
        area: null,
        areas: [],
        loading: false,
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_AREA:
      return {
        ...state,
        areas: state.areas.filter((area) => area._id !== action.payload),
        loading: false,
      };
    case types.AREA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
