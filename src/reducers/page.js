import { GET_PHOTOS, REQUEST, SUCCESS, FAIL } from '../constants/Page'
const initialState = {
	year: 2018,
	photos: [],
	fetching: false,
	error: ''
}

export default function page(state = initialState, action) {
	switch (action.type) {
		case GET_PHOTOS + REQUEST:
			return {
				...state,
				year: action.payload,
				fetching: true,
				error: ''
			}
		case GET_PHOTOS + SUCCESS:
			return {
				...state,
				photos: action.payload,
				fetching: false,
				error: ''
			}
		case GET_PHOTOS + FAIL:
			return {
				...state,
				error: action.payload.message,
				fetching: false
			}
		default:
            return state
	}
}