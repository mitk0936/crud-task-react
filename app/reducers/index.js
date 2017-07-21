import { combineReducers } from "redux"

const defaultPermissions = {
	'CREATE': false,
	'READ': false,
	'UPDATE': false,
	'DELETE': false
}

const permissions = (state = defaultPermissions, action = { type }) => {
	// switch (action.type) {

	// }

	return state
}

export const reducers = combineReducers({ permissions })
