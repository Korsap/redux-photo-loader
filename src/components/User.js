import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class User extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired
		}),
        handleLogin: PropTypes.func.isRequired,
		handleLogout: PropTypes.func.isRequired
	}

	componentDidMount() {
		console.log('222', this.props.user.status)
		VK.Auth.getLoginStatus((res) => {  // eslint-disable-line no-undef
			if (res.session) {
				console.log('componentDidMount()', res.status)
				if(res.status === 'connected') this.props.handleLogin()
			}
		})
	}

	render() {
        const {user, handleLogin, handleLogout} = this.props
		let template

		if(user.name) {
        	template =
				<div>
					<p>Привет, {user.name} {user.lastName}</p>
					<button className='btn' onClick={handleLogout}>Выйти</button>
					{user.error ? <p className='error'> {user.error}. <br/> Попробуйте еще раз.</p> : ''}
				</div>
		} else {template = <button className='btn' onClick={handleLogin}>Войти</button>}

        return (
            <div className='ib user'>
				{template}
				{user.error ? <p className='error'> {user.error}. <br/> Попробуйте еще раз.</p> : ''}
            </div>
        )
    }
}