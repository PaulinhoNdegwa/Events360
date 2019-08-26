import * as types from '../actionTypes/followingActionTypes';
import { axiosWithToken } from '../../utils/axiosHelpers'

const followRequest = () => ({
    type: types.FOLLOW_USER_REQUEST
})

const followSuccess = () => ({
    type: types.FOLLOW_USER_SUCCESS
})

const followFailure = () => ({
    type: types.FOLLOW_USER_FAILURE
})

const unfollowRequest = () => ({
    type: types.UNFOLLOW_USER_REQUEST
})

const unfollowSuccess = () => ({
    type: types.UNFOLLOW_USER_SUCCESS
})

const unfollowFailure = () => ({
    type: types.UNFOLLOW_USER_FAILURE
})

export const followUser = user => dispatch => {
    dispatch(followRequest())
    axiosWithToken.post('api/follow', { 'id': user })
        .then(response => {
            console.log(response.data)
            dispatch(followSuccess())
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch(followFailure())
        })
}

export const unfollowUser = userId => dispatch => {
    dispatch(unfollowRequest())
    axiosWithToken.delete('api/follow/' + userId)
        .then(response => {
            console.log(response.data)
            dispatch(unfollowSuccess())
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch(unfollowFailure())
        })
}
