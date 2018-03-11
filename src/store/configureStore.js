import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose

	const enhancer = composeEnhancer(applyMiddleware(thunk, logger))
	const store = createStore(rootReducer, initialState, enhancer)

	return store;
}