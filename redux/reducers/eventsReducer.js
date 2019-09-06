import * as types from '../actionTypes/eventActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { POST_COMMENT_FAILURE, POST_COMMENT_REQUEST, POST_COMMENT_SUCCESS } from '../actionTypes/commentsActionsTypes'
import { LIKE_EVENT_SUCCESS, UNLIKE_EVENT_SUCCESS } from '../actionTypes/likesActionTypes'

const initialState = {
    loading: false,
    singleEventLoading: false,
    postingComment: false,
    postCommentSuccess: false,
    getEventsSuccess: false,
    getExploreEventsSuccess: false,
    getSingleEventSuccess: false,
    createEventSuccess: false,
    events: [],
    exploreEvents: [],
    event: {},
    comments: [],
    eventLiked: null,
    eventUnliked: null
}

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_EVENTS_SUCCESS:
            const eventSet = new Set();
            const prevEvents = state.events.concat(action.events);
            const filteredEvents = prevEvents.filter(el => {
                const duplicate = eventSet.has(el.id);
                eventSet.add(el.id);
                return !duplicate;
            });
            console.log(filteredEvents);
            return {
                ...state,
                loading: false,
                getEventsSuccess: true,
                // events: [...new Set(state.events.concat(action.events))],
                events: filteredEvents
            }
        case types.GET_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.GET_EXPLORE_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_EXPLORE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                getExploreEventsSuccess: true,
                exploreEvents: action.events
            }
        case types.GET_EXPLORE_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case types.CREATE_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                createEventSuccess: true,
                events: [...state.events, action.event]
            }
        case types.CREATE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                createEventSuccess: false,
            }
        case types.GET_EVENT_REQUEST:
            return {
                ...state,
                singleEventLoading: true
            }
        case types.GET_EVENT_SUCCESS:
            return {
                ...state,
                singleEventLoading: false,
                getSingleEventSuccess: true,
                event: action.event,
                comments: action.comments
            }
        case types.GET_EVENT_FAILURE:
            return {
                ...state,
                singleEventLoading: false,
                error: action.error
            }
        case POST_COMMENT_REQUEST:
            return {
                ...state,
                postingComment: true
            }
        case POST_COMMENT_SUCCESS:
            return {
                ...state,
                postingComment: false,
                comments: [...state.comments, action.comment],
                postCommentSuccess: true
            }
        case POST_COMMENT_FAILURE:
            return {
                ...state,
                postingComment: false,
                error: action.error
            }
        case LIKE_EVENT_SUCCESS:
            const likedEventId = action.eventId.event_id
            const events = state.events.map(event => {
                if (event.id === likedEventId) {
                    return {
                        ...event,
                        'likes_count': event.likes_count + 1,
                        'liked': true
                    }
                }
                return event
            })
            return {
                ...state,
                events
            }
        case UNLIKE_EVENT_SUCCESS:
            const unlikedEventId = action.eventId
            const _events = state.events.map(event => {
                if (event.id === unlikedEventId) {
                    return {
                        ...event,
                        'likes_count': event.likes_count - 1,
                        'liked': false
                    }
                }
                return event
            })
            return {
                ...state,
                events: _events
            }
        default:
            return state;
    }
}
