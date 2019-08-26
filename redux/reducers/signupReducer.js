import * as types from '../actionTypes/authActionTypes';

const initialState = {
    isLoading: false,
}

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                signupSuccess: true,
                user: action.user,
                token: action.token
            }
        case types.SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                signupSuccess: false,
                error: action.error
            }

        default:
            return state;
    }
}
