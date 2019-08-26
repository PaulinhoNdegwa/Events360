// import * as types from '../actionTypes/profileActionTypes'
import * as types from '../actionTypes/profileActionTypes';
import axios from 'axios'
import { axiosWithToken } from '../../utils/axiosHelpers'

const getProfileRequest = () => ({
    type: types.GET_USER_PROFILE_REQUEST
})
const getProfileSuccess = (profile, events) => ({
    type: types.GET_USER_PROFILE_SUCCESS,
    profile,
    events
})
const getProfileFailure = (error) => ({
    type: types.GET_USER_PROFILE_FAILURE,
    error
})

const updateProfileRequest = () => ({
    type: types.UPDATE_PROFILE_REQUEST
})
const updateProfileSuccess = (profile) => ({
    type: types.UPDATE_PROFILE_SUCCESS,
    profile
})
const updateProfileFailure = (error) => ({
    type: types.UPDATE_PROFILE_FAILURE,
    error
})

const getFollowersRequest = () => ({
    type: types.GET_FOLLOWERS_REQUEST
})
const getFollowersSuccess = (users) => ({
    type: types.GET_FOLLOWERS_SUCCESS,
    users
})
const getFollowersFailure = (error) => ({
    type: types.GET_FOLLOWERS_FAILURE,
    error
})

export const getUserProfile = (user_id) => dispatch => {
    dispatch(getProfileRequest());
    axiosWithToken.get('api/user/profiles/' + user_id)

        .then(response => {
            console.log(response)
            if (response.status === 200) {
                console.log(response.data)
                dispatch(getProfileSuccess(response.data.user, response.data.user.events))
            }
        })
        .catch(error => {
            console.log(error.request)
            dispatch(getProfileFailure(error.request.response))
        })
}

export const updateUserProfile = (payload) => dispatch => {
    dispatch(updateProfileRequest());
    axiosWithToken.put('api/user/profile/update', payload)
        .then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(updateProfileSuccess(response.data.user))
            }
        })
        .catch(error => {
            console.log(error.request)
            dispatch(updateProfileFailure(error.request.response))
        })

}

export const getFollowers = () => dispatch => {
    dispatch(getFollowersRequest());
    axiosWithToken.get('api/followers')
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch(getFollowersSuccess(response.data.users))
            }
        })
        .catch(error => {
            console.log(error.request)
            dispatch(getFollowersFailure(error.request.response))
        })

}
