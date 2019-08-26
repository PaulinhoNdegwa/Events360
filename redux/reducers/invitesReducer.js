import * as types from '../actionTypes/invitesActionTypes';

const initialState = {
    loading: false,
    sendInviteSuccess: false
}

export const invitesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEND_INVITE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.SEND_INVITE_SUCCESS:
            return {
                ...state,
                loading: false,
                sendInviteSuccess: true
            }
        case types.SEND_INVITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}
