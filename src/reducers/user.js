import { LOGIN, REQUEST, SUCCESS, FAIL, LOGOUT} from '../constants/User'
const initialState = {
	name: '',
	lastName: '',
	error: '',
	fetching: false,
	status: ''
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
				fetching: false,
				status: action.payload.userStatus
			}
		case LOGIN + FAIL:
			return {
				...state,
				error: action.payload.message,
				fetching: false,
				status: action.payload.userStatus
			}
		case LOGOUT + REQUEST:
			return {
				...state,
				fetching: true
			}
		case LOGOUT + SUCCESS:
			return {
				...state,
				name: '',
				lastName: '',
				error: '',
				fetching: false,
				status: action.payload.userStatus
			}
		case LOGOUT + FAIL:
			return {
				...state,
				error: action.payload.message,
				fetching: false,
				status: action.payload.userStatus
			}
		default:
            return state
	}
}