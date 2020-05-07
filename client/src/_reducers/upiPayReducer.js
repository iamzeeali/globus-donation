import * as types from "./../_actions/types";

const initialUPIPay = {
    upiPay: null,
    upiPays: [],
    allUPIPays: [],
    totalUPIPay: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialUPIPay, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_UPI_PAY:
            return {
                ...state,
                upiPay: payload,
                loading: false
            };
        case types.GET_UPI_PAYS:
            return {
                ...state,
                upiPays: payload,
                loading: false
            };

        case types.GET_ALL_UPI_PAYS:
            return {
                ...state,
                allUPIPays: payload,
                loading: false
            };

        case types.ADD_UPI_PAY:
            return {
                ...state,
                upiPay: payload,
                loading: false
            };
        case types.SET_CURRENT_UPI_PAY:
            return {
                ...state,
                upiPay: action.payload
            };
        case types.CLEAR_UPI_PAY:
            return {
                ...state,
                upiPay: null,
                upiPays: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //   ...state,
        //     filtered: upiPay.upiPays.filter(upiPay => {
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
                filtered: null
            };
        case types.DELETE_UPI_PAY:
            return {
                ...state,
                upiPays: state.upiPays.filter(
                    upiPay => upiPay._id !== action.payload
                ),
                loading: false
            };
        case types.UPI_PAY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
