import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class User extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired
		}),
        handleLogin: PropTypes.func.isRequired
	}

	render() {
        const {user, handleLogin} = this.props
		let template

		if(user.name) {template = <p>Привет, {user.name} {user.lastName}</p>
		} else {template = <button className='btn' onClick={handleLogin}>Войти</button>}

        return (
            <div className='ib user'>
				{template}
				{user.error ? <p className='error'> {user.error}. <br/> Попробуйте еще раз.</p> : ''}
            </div>
        )
    }
}