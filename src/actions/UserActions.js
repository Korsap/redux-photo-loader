import { LOGIN, REQUEST, SUCCESS, FAIL} from '../constants/User'

export function handleLogin() {
    return (dispatch) => {
        dispatch({
            type: LOGIN + REQUEST
        })

        VK.Auth.login((res) => { // eslint-disable-line no-undef
            if(res.session) {
                let userName = res.session.user.first_name;
                let userLastName = res.session.user.last_name;

                dispatch({
                    type: LOGIN + SUCCESS,
                    payload: { userName, userLastName }
                })
            } else {
                dispatch({
                    type: LOGIN + FAIL,
                    error: true,
                    payload: new Error('Ошибка авторизации')
                })
            }
        }, 4)
    }
}