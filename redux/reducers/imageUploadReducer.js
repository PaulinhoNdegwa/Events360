import * as types from '../actionTypes/imageUploadActionTypes';

const initialState = {
    isUploading: false,
}

export const imageUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_IMAGE_REQUEST:
            return {
                ...state,
                isUploading: true
            }
        case types.UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                isUploading: false,
                uploadSuccess: true,
                image: action.image
            }
        case types.UPLOAD_IMAGE_FAILURE:
            return {
                ...state,
                isUploading: false,
                uploadSuccess: false,
                error: action.error
            }

        default:
            return state;
    }
}
