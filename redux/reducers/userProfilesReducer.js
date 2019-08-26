import * as types from '../actionTypes/profileActionTypes';
import { FOLLOW_USER_SUCCESS, UNFOLLOW_USER_SUCCESS } from '../actionTypes/followingActionTypes'

const initialState = {
    isLoading: false,
    users: []
}

export const userProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: action.profile,
                events: action.events
            }
        case types.GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case types.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: action.profile,
                updateProfileSuccess: true
            }
        case types.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                updateProfileSuccess: false
            }
        case types.GET_FOLLOWERS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.GET_FOLLOWERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.users
            }
        case types.GET_FOLLOWERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case FOLLOW_USER_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    is_following: true
                }
            }
        case UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    is_following: false
                }
            }
        default:
            return state;
    }
}
