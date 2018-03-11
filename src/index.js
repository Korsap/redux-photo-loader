import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import './styles/App.css'

const store = configureStore();

const render = Component => {
	ReactDOM.render(
			<Provider store={store}>
				<div className='app'>
                    <Component />
				</div>
			</Provider>,
		document.getElementById('root'),
	)
}

render(App)