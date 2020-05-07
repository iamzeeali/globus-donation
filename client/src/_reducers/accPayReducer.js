import * as types from "./../_actions/types";

const initialAccPay = {
    accPay: null,
    accPays: [],
    allAccPays: [],
    totalAccPay: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialAccPay, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_ACC_PAY:
            return {
                ...state,
                accPay: payload,
                loading: false
            };
        case types.GET_ACC_PAYS:
            return {
                ...state,
                accPays: payload,
                loading: false
            };

        case types.GET_ALL_ACC_PAYS:
            return {
                ...state,
                allAccPays: payload,
                loading: false
            };

        case types.ADD_ACC_PAY:
            return {
                ...state,
                accPay: payload,
                loading: false
            };
        case types.SET_CURRENT_ACC_PAY:
            return {
                ...state,
                accPay: action.payload
            };
        case types.CLEAR_ACC_PAY:
            return {
                ...state,
                accPay: null,
                accPays: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //   ...state,
        //     filtered: accPay.accPays.filter(accPay => {
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
        case types.DELETE_ACC_PAY:
            return {
                ...state,
                accPays: state.accPays.filter(
                    accPay => accPay._id !== action.payload
                ),
                loading: false
            };
        case types.ACC_PAY_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
