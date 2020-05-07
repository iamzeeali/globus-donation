import * as types from "./../_actions/types";

const initialSetting = {
    setting: null,
    settings: [],
    allSettings: [],
    totalSetting: [],
    error: {},
    filtered: null,
    loading: true
};

export default function (state = initialSetting, action) {
    const { type, payload } = action;

    switch (type) {
        case types.GET_SETTING:
            return {
                ...state,
                setting: payload,
                loading: false
            };
        case types.GET_SETTINGS:
            return {
                ...state,
                settings: payload,
                loading: false
            };

        case types.GET_ALL_SETTINGS:
            return {
                ...state,
                allSettings: payload,
                loading: false
            };
        case types.GET_TOTAL_SETTING:
            return {
                ...state,
                totalSetting: payload,
                loading: false
            };
        case types.ADD_SETTING:
            return {
                ...state,
                setting: payload,
                loading: false
            };
        case types.SET_CURRENT_SETTING:
            return {
                ...state,
                setting: action.payload
            };
        case types.CLEAR_SETTING:
            return {
                ...state,
                setting: null,
                settings: [],
                loading: false
            };

        // case types.FILTER_STAFF:
        //   return {
        //   ...state,
        //     filtered: setting.settings.filter(setting => {
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
        case types.DELETE_SETTING:
            return {
                ...state,
                settings: state.settings.filter(
                    setting => setting._id !== action.payload
                ),
                loading: false
            };
        case types.SETTING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
