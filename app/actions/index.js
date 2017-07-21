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

// Action creators
export const permissions = {
	request: () => action(PERMISSIONS.REQUEST, { }),
	success: (response) => action(PERMISSIONS.SUCCESS, { response }),
	failure: () => action(PERMISSIONS.FAILURE, { })
}

export const checkPermission = (permissionType, success, failure) => action(CHECK_PERMISSION, { permissionType, success, failure })
