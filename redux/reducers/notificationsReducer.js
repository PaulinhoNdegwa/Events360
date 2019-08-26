import * as types from '../actionTypes/notificationsActionTypes'

initialState = {
    loading: false,
    notifications: []
}

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.notifications
            }
        case types.GET_ALL_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.READ_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.READ_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                markAsRead: true
            }
        case types.READ_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                markAsRead: false,
                error: action.error
            }
        default:
            return state;
    }
}
