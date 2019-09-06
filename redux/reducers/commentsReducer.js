import * as types from '../actionTypes/commentsActionsTypes';

initialState = {
    loading: false,
    comments: [],
    getCommentsSuccess: false
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.comments
            }
        case types.GET_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}
