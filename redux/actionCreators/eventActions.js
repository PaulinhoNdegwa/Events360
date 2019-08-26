import * as types from '../actionTypes/eventActionTypes';
import { axiosWithToken } from '../../utils/axiosHelpers';


const getEventsRequest = () => ({
    type: types.GET_EVENTS_REQUEST
})

const getEventsSuccess = (events) => ({
    type: types.GET_EVENTS_SUCCESS,
    events
})

const getEventsFailure = (error) => ({
    type: types.GET_EVENTS_FAILURE,
    error
})

const getExploreEventsRequest = () => ({
    type: types.GET_EXPLORE_EVENTS_REQUEST
})

const getExploreEventsSuccess = (events) => ({
    type: types.GET_EXPLORE_EVENTS_SUCCESS,
    events
})

const getExploreEventsFailure = (error) => ({
    type: types.GET_EXPLORE_EVENTS_FAILURE,
    error
})

const createEventRequest = () => ({
    type: types.CREATE_EVENT_REQUEST
})

const createEventSuccess = (event) => ({
    type: types.CREATE_EVENT_SUCCESS,
    event
})

const createEventFailure = (error) => ({
    type: types.CREATE_EVENT_FAILURE,
    error
})

const getEventRequest = () => ({
    type: types.GET_EVENT_REQUEST
})

const getEventSuccess = (event, comments) => ({
    type: types.GET_EVENT_SUCCESS,
    event,
    comments
})

const getEventFailure = (error) => ({
    type: types.GET_EVENT_FAILURE,
    error
})

export const getAllEvents = (page) => dispatch => {
    dispatch(getEventsRequest());
    axiosWithToken.get('api/events?page=' + page)
        .then(response => {
            console.log(response.data)
            if (response.status === 200) {
                dispatch(getEventsSuccess(response.data.events.data))
            }
        })
        .catch(error => {
            dispatch(getEventsFailure(error.request.response))
        })
}

export const getExploreEvents = () => dispatch => {
    dispatch(getExploreEventsRequest());
    axiosWithToken.get('api/explore/events')
        .then(response => {
            if (response.status === 200) {
                dispatch(getExploreEventsSuccess(response.data.events))
            }
        })
        .catch(error => {
            dispatch(getExploreEventsFailure(error.request.response))
        })
}

export const createEvent = (event_data) => dispatch => {
    dispatch(createEventRequest());
    axiosWithToken.post('api/events', event_data)
        .then(response => {
            if (response.status === 201) {
                dispatch(createEventSuccess(response.data.event))
            }
        })
        .catch(error => {
            console.log(error.request)
            dispatch(createEventFailure(error.request.response))
        })
}

export const getSingleEvent = (eventId) => dispatch => {
    dispatch(getEventRequest())
    axiosWithToken.get('api/events/' + eventId)
        .then(response => {
            console.log(response.data)
            if (response.status = 200) {
                dispatch(getEventSuccess(response.data.event, response.data.event.comments))
            }
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch(getEventFailure(error.request.response))
        })
}
