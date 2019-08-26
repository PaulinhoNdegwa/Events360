import * as types from '../actionTypes/invitesActionTypes';
import { Toast } from 'native-base'
import { axiosWithToken } from '../../utils/axiosHelpers';

const sendInviteRequest = () => ({
    type: types.SEND_INVITE_REQUEST
})

const sendInviteSuccess = invite => ({
    type: types.SEND_INVITE_SUCCESS,
    invite
})

const sendInviteFailure = error => ({
    type: types.SEND_INVITE_FAILURE,
    error
})

export const sendInvite = (eventId, userEmail) => dispatch => {
    dispatch(sendInviteRequest())
    axiosWithToken.post('api/events/' + eventId + '/invite', { invitee: userEmail })
        .then(response => {
            console.log(response.data)
            if (response.status) {
                dispatch(sendInviteSuccess(response.data))
            }
        })
        .catch(error => {
            Toast.show({
                text: error.request.response,
                buttonText: "Okay",
                type: "warning"
            })
            console.log(error.request.response)
            dispatch(sendInviteFailure(error.request.response))
        })
}
