import * as types from '../actionTypes/likesActionTypes'

initialState = {
    loading: true
}

export const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIKE_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.LIKE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                likeSuccess: true
            }
        case types.LIKE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                likeSuccess: false
            }
        case types.UNLIKE_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.UNLIKE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                unlikeSuccess: true
            }
        case types.UNLIKE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                unlikeSuccess: false
            }
        default:
            return state;
    }
}
