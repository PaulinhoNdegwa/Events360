import * as types from '../actionTypes/imageUploadActionTypes'
import { axiosWithToken } from '../../utils/axiosHelpers';

export const uploadImage = image_uri => dispatch => {
    dispatch({
        type: types.UPLOAD_IMAGE_REQUEST
    })
    axiosWithToken.post('api/image/upload', image_uri)
        .then(response => {
            console.log(response)
            dispatch({
                type: types.UPLOAD_IMAGE_SUCCESS,
                image: response.data
            })
        })
        .catch(error => {
            console.log(error.request.response)
            dispatch({
                type: types.UPLOAD_IMAGE_FAILURE,
                error
            })
        })
}

// export const uploadToCloudinary = (photo) => {
//     return RNFetchBlob.fetch(
//         'POST',
//         'https://api.cloudinary.com/v1_1/' + cloudinaryName + '/image/upload/',
//         {
//             'Content-type': 'multipart/form-data'
//         },
//         [
//             { name: 'Photo', filename: photo.fileName, data: RNFetchBlob.wrap(photo.originUrl) }
//         ]
//     )
// }
