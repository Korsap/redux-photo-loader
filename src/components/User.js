import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class User extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired
		}),
        handleLogin: PropTypes.func.isRequired,
		handleLogout: PropTypes.func.isRequired
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