import * as types from '../actionTypes/notificationsActionTypes';
import { axiosWithToken } from '../../utils/axiosHelpers';

const getAllNotificationsRequest = () => ({
    type: types.GET_ALL_NOTIFICATIONS_REQUEST
})

const getAllNotificationsSuccess = notifications => ({
    type: types.GET_ALL_NOTIFICATIONS_SUCCESS,
    notifications
})

const getAllNotificationsFailure = error => ({
    type: types.GET_ALL_NOTIFICATIONS_FAILURE,
    error
})

const readNotificationsRequest = () => ({
    type: types.READ_NOTIFICATIONS_REQUEST
})

const readNotificationsSuccess = () => ({
    type: types.READ_NOTIFICATIONS_SUCCESS,
})

const readNotificationsFailure = error => ({
    type: types.READ_NOTIFICATIONS_FAILURE,
    error
})

export const getAllNotifications = () => dispatch => {
    dispatch(getAllNotificationsRequest());
    axiosWithToken.get('api/notifications')
        .then(response => {
            console.log(response.data.notifications)
            if (response.status === 200) {
                dispatch(getAllNotificationsSuccess(response.data.notifications))
            }
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch(getAllNotificationsFailure(error.request.response))
        })
}

export const readNotifications = () => dispatch => {
    dispatch(readNotificationsRequest());
    axiosWithToken.put('api/notifications')
        .then(response => {
            if (response.status === 200) {
                dispatch(readNotificationsSuccess())
            }
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch(readNotificationsFailure(error.request.response))
        })
}
