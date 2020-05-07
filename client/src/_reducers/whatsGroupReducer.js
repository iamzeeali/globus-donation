import * as types from "./../_actions/types";

const initialWhatGroup = {
    whatgroup: null,
    whatgroups: [],
    allWhatGroups: [],
    totalWhatGroup: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialWhatGroup, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_WHAT_GROUP:
            return {
                ...state,
                whatgroup: payload,
                loading: false
            };
        case types.GET_WHAT_GROUPS:
            return {
                ...state,
                whatgroups: payload,
                loading: false
            };


        case types.ADD_WHAT_GROUP:
            return {
                ...state,
                whatgroup: payload,
                loading: false
            };
        case types.SET_CURRENT_WHAT_GROUP:
            return {
                ...state,
                whatgroup: action.payload
            };
        case types.CLEAR_WHAT_GROUP:
            return {
                ...state,
                whatgroup: null,
                whatgroups: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //   ...state,
        //     filtered: whatgroup.whatgroups.filter(whatgroup => {
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
        case types.DELETE_WHAT_GROUP:
            return {
                ...state,
                whatgroups: state.whatgroups.filter(
                    whatgroup => whatgroup._id !== action.payload
                ),
                loading: false
            };
        case types.WHAT_GROUP_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
