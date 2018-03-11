import { GET_PHOTOS, REQUEST, SUCCESS } from '../constants/Page'
const initialState = {
	year: 2018,
	photos: [],
	fetching: false
}

export default function page(state = initialState, action) {
	switch (action.type) {
		case GET_PHOTOS + REQUEST:
			return {...state, year: action.payload, fetching: true}
		case GET_PHOTOS + SUCCESS:
			return {...state, photos: action.payload, fetching: false}
		default:
            return state
	}
}