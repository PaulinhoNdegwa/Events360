import * as types from '../actionTypes/authActionTypes';
import axios from 'axios'
import { Toast } from 'native-base'
import { axiosWithToken } from '../../utils/axiosHelpers'

const signupRequest = () => ({
    type: types.SIGNUP_REQUEST
})
const signupSuccess = (user, token) => ({
    type: types.SIGNUP_SUCCESS,
    user,
    token
})
const signupFailure = (user, error) => ({
    type: types.SIGNUP_FAILURE,
    user,
    error
})

export const signup = (payload) => dispatch => {
    dispatch(signupRequest());
    axiosWithToken.post('api/auth/register', payload)
        .then(response => {
            if (response.status === 200) {
                dispatch(signupSuccess(response.data.user, response.data.token))
            }
        })
        .catch(error => {
            Toast.show({
                text: error.request.response,
                buttonText: "Okay",
                type: "warning"
            })
            dispatch(signupFailure(error.request.response))
        })

}
