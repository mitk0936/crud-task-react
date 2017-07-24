import { combineReducers } from "redux"
import * as actions from '../actions'
import products from './products'

const defaultPermissions = {
	'CREATE': false,
	'READ': false,
	'UPDATE': false,
	'DELETE': false
}

const permissions = (state = defaultPermissions, action = { type }) => {
	switch (action.type) {
		case actions.PERMISSIONS.SUCCESS:
			return {
				...defaultPermissions,
				...action.permissions.reduce((newPermissionsState, permissionId) => {
					newPermissionsState[permissionId] = true
					return newPermissionsState
				}, {})
			}
	}

	return state
}

export const reducers = combineReducers({ permissions, products })
