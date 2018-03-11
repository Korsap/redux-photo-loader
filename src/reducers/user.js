import { LOGIN, REQUEST, SUCCESS, FAIL} from '../constants/User'
const initialState = {
	name: '',
	lastName: '',
	error: '',
	fetching: false
}

export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN + REQUEST:
			return {
				...state,
				fetching: true
			}
		case LOGIN + SUCCESS:
			return {
				...state,
				name: action.payload.userName,
				lastName: action.payload.userLastName,
				error: '',
				fetching: false
			}
		case LOGIN + FAIL:
			return {
				...state,
				error: action.payload.message,
				fetching: false
			}
		default:
            return state
	}
}