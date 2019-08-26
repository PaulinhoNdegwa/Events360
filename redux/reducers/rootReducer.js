import { loginReducer } from './loginReducer'
import { signupReducer } from './signupReducer'
import { userProfilesReducer } from './userProfilesReducer'
import { eventsReducer } from './eventsReducer'
import { imageUploadReducer } from './imageUploadReducer'
import { commentsReducer } from './commentsReducer'
import { invitesReducer } from './invitesReducer'
import { notificationsReducer } from './notificationsReducer'
import { likesReducer } from './likesReducer'
import { followingReducer } from './followingReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    loginReducer,
    signupReducer,
    userProfilesReducer,
    eventsReducer,
    imageUploadReducer,
    commentsReducer,
    invitesReducer,
    notificationsReducer,
    likesReducer,
    followingReducer
})

export default rootReducer;
