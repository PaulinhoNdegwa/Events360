import * as types from '../actionTypes/authActionTypes';
import axios from 'axios'
import { Toast } from 'native-base'
import { axiosWithToken } from '../../utils/axiosHelpers'


const loginRequest = () => ({
    type: types.LOGIN_REQUEST
})
const loginSuccess = (user, token) => ({
    type: types.LOGIN_SUCCESS,
    user,
    token
})
const loginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    error
})

export const login = (payload) => dispatch => {
    console.log(payload)
    dispatch(loginRequest());
    axiosWithToken.post('api/auth/login', payload)
        .then(response => {
            console.log(response.data)
            if (response.status === 200) {
                dispatch(loginSuccess(response.data.user, response.data.token))
            }
        })
        .catch(error => {
            console.log(error.request)
            Toast.show({
                text: error.request.response,
                buttonText: "Okay",
                type: "warning"
            })
            dispatch(loginFailure(error.request.response.error))
        })

}
