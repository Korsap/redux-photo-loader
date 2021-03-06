import { LOGIN, REQUEST, SUCCESS, FAIL, LOGOUT} from '../constants/User'

export function handleLogin() {
    return (dispatch) => {
        dispatch({
            type: LOGIN + REQUEST
        })

        VK.Auth.login((res) => { // eslint-disable-line no-undef
            console.log('---', res, document.cookie)
            if(!document.cookie) alert("Похоже, что попытка сохранения cookies была заблокирована. Пожалуйста разрешите сохранение cookies в настройках браузера и перезагрузите страницу!")

            if(res.session) {
                let userName = res.session.user.first_name;
                let userLastName = res.session.user.last_name;
                let userStatus = res.status;

                dispatch({
                    type: LOGIN + SUCCESS,
                    payload: { userName, userLastName, userStatus }
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

export function handleLogout() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT + REQUEST
        })

        VK.Auth.logout((res) => { // eslint-disable-line no-undef
            console.log('---', res)
            if (!res.session) {
				let userStatus = res.status;
                dispatch({
                    type: LOGOUT + SUCCESS,
                    payload: {userStatus}
                })
            } else {
                dispatch({
                    type: LOGOUT + FAIL,
                    error: true,
                    payload: new Error('Ошибка выхода')
                })
            }
        })
    }
}