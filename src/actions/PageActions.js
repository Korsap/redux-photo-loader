import { GET_PHOTOS, REQUEST, SUCCESS } from '../constants/Page'

export function getPhotos(year) {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS + REQUEST,
            payload: year
        })
        setTimeout(() => {
            dispatch({
                type: GET_PHOTOS + SUCCESS,
                payload: [1,2,3,4,5]
            })
        }, 1000)
    }
}