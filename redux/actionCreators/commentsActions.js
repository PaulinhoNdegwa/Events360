import * as types from '../actionTypes/commentsActionsTypes';
import { axiosWithToken } from '../../utils/axiosHelpers'

const getCommentsRequest = () => ({
    type: types.GET_COMMENTS_REQUEST
})

const getCommentsSuccess = comments => ({
    type: types.GET_COMMENTS_SUCCESS,
    comments
})

const getCommentsFailure = error => ({
    type: types.GET_COMMENTS_FAILURE,
    error
})

const postCommentRequest = () => ({
    type: types.POST_COMMENT_REQUEST
})

const postCommentSuccess = comment => ({
    type: types.POST_COMMENT_SUCCESS,
    comment
})

const postCommentFailure = error => ({
    type: types.POST_COMMENT_FAILURE,
    error
})

export const getComments = () => dispatch => {
    dispatch(getCommentsRequest());
    axiosWithToken.get('api/comments')
        .then(response => {
            if (response.status === 200) {
                dispatch(getCommentsSuccess(response.data.comments));
            }
        })
        .catch(error => {
            dispatch(getCommentsFailure(error.request.response));
        })
}

export const postComment = (comment) => dispatch => {
    dispatch(postCommentRequest());
    axiosWithToken.post('api/comments', comment)
        .then(response => {
            if (response.status === 201) {
                dispatch(postCommentSuccess(response.data.comment));
            }
        })
        .catch(error => {
            dispatch(postCommentFailure(error.request.response));
        })
}
