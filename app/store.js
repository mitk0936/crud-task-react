import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import freeze from "redux-freeze"
import { reducers } from "./reducers/index"
import { sagas } from "./middleware/sagas"

// add the middlewares
let middlewares = []

// add the saga middleware
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

// add the freeze dev middleware
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(freeze)
}

// apply the middleware
let middleware = applyMiddleware(...middlewares)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
	middleware = compose(middleware, window.devToolsExtension())
}

// create the store
const store = createStore(reducers, {}, middleware)
sagaMiddleware.run(sagas)

export { store }
