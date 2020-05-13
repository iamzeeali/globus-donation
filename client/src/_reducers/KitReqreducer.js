import * as types from "./../_actions/types";

const initialKitReq = {
  kitreq: null,
  kitreqs: [],
  allKitReqs: [],
  totalKitReq: [],
  req_length: null,
  sendingLoader: false,
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialKitReq, action) {
  const { type, payload, sendingPayload } = action;

  switch (type) {
    case types.GET_KIT_REQ:
      return {
        ...state,
        kitreq: payload.data,
        loading: false,
      };
    case types.GET_KIT_REQS:
      return {
        ...state,
        kitreqs: payload.data,
        req_length: payload.result,
        loading: false,
      };

    case types.GET_TOTAL_KIT_REQ:
      return {
        ...state,
        totalKitReq: payload,
        loading: false,
      };

    case types.ADD_KIT_REQ:
      return {
        ...state,
        kitreq: payload,
        loading: false,
        sendingLoader: sendingPayload,
      };
    case types.SET_CURRENT_KIT_REQ:
      return {
        ...state,
        kitreq: action.payload,
      };
    case types.CLEAR_KIT_REQ:
      return {
        ...state,
        kitreq: null,
        kitreqs: [],
        loading: false,
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_KIT_REQ:
      return {
        ...state,
        kitreqs: state.kitreqs.filter(
          (kitreq) => kitreq._id !== action.payload
        ),
        loading: false,
      };
    case types.KIT_REQ_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
