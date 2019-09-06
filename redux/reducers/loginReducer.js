import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actionTypes/authActionTypes';

const initialState = {
    isLoading: false,
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loginSuccess: true,
                user: action.user,
                token: action.token
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                loginSuccess: false,
                error: action.error
            }

        default:
            return state;
    }
}
