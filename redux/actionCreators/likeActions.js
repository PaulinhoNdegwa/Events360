import * as types from '../actionTypes/likesActionTypes'
import { axiosWithToken } from '../../utils/axiosHelpers'

const likeEventRequest = () => ({
    type: types.LIKE_EVENT_REQUEST
})

const likeEventSuccess = (eventId) => ({
    type: types.LIKE_EVENT_SUCCESS,
    eventId
})

const likeEventFailure = () => ({
    type: types.LIKE_EVENT_FAILURE
})

const unlikeEventRequest = () => ({
    type: types.UNLIKE_EVENT_REQUEST
})

const unlikeEventSuccess = (eventId) => ({
    type: types.UNLIKE_EVENT_SUCCESS,
    eventId
})

const unlikeEventFailure = () => ({
    type: types.UNLIKE_EVENT_FAILURE
})

export const likeEvent = (eventId) => dispatch => {
    dispatch(likeEventRequest())
    axiosWithToken.post('api/likes', eventId)
        .then(response => {
            console.log(response.status)
            if (response.status === 200) dispatch(likeEventSuccess(eventId))
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch(likeEventFailure())
        })
}

export const unlikeEvent = (eventId) => dispatch => {
    dispatch(unlikeEventRequest())
    axiosWithToken.delete('api/likes/' + eventId)
        .then(response => {
            console.log(response.data)
            dispatch(unlikeEventSuccess(eventId))
        })
        .catch(error => {
            console.log(error.request)
            dispatch(unlikeEventFailure())
        })
}
