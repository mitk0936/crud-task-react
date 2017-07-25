const action = (type, payload = {}) => {
	return { type, ...payload }
}

// Ajax Action Types
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes (base) {
	return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const PERMISSIONS = createRequestTypes('PERMISSIONS')
export const ADD_PRODUCT = createRequestTypes('ADD_PRODUCT')
export const DELETE_PRODUCT = createRequestTypes('DELETE_PRODUCT')
export const UPDATE_PRODUCT = createRequestTypes('UPDATE_PRODUCT')

// Action creators
export const permissions = {
	request: () => action(PERMISSIONS.REQUEST),
	success: (permissions) => action(PERMISSIONS.SUCCESS, { permissions }),
	failure: () => action(PERMISSIONS.FAILURE)
}

export const addProduct = {
	request: ({ id, name, price, currency, onRequestFailure }) => action(ADD_PRODUCT.REQUEST, { id, name, price, currency, onRequestFailure }),
	success: ({ id, name, price, currency }) => action(ADD_PRODUCT.SUCCESS, { id, name, price, currency }),
	failure: ({ id, name, price, currency }) => action(ADD_PRODUCT.FAILURE, { id, name, price, currency })
}

export const deleteProduct = {
	request: ({ id, onRequestFailure }) => action(DELETE_PRODUCT.REQUEST, { id, onRequestFailure }),
	success: ({ id }) => action(DELETE_PRODUCT.SUCCESS, { id }),
	failure: ({ id }) => action(DELETE_PRODUCT.FAILURE, { id })
}
