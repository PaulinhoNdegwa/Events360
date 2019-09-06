import * as types from '../actionTypes/followingActionTypes'

initialState = {
    loading: true
}

export const followingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FOLLOW_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                followSuccess: true
            }
        case types.FOLLOW_USER_FAILURE:
            return {
                ...state,
                loading: false,
                followSuccess: false
            }
        case types.UNFOLLOW_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                unfollowSuccess: true
            }
        case types.UNFOLLOW_USER_FAILURE:
            return {
                ...state,
                loading: false,
                unfollowSuccess: false
            }
        default:
            return state;
    }
}
