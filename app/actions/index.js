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
export const CHECK_PERMISSION = 'CHECK_PERMISSION'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

// Action creators
export const permissions = {
	request: () => action(PERMISSIONS.REQUEST, { }),
	success: (permissions) => action(PERMISSIONS.SUCCESS, { permissions }),
	failure: () => action(PERMISSIONS.FAILURE, { })
}

export const checkPermission = (permissionType, success, failure) => action(CHECK_PERMISSION, { permissionType, success, failure })
export const addProduct = (id, name, price, currency) => action(ADD_PRODUCT, { id, name, price, currency })
export const deleteProduct = (id) => action(DELETE_PRODUCT, { id })
