import { combineReducers } from "redux"
import * as actions from '../actions'
import { omit } from '../utils'

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

const products = (state = {}, action) => {
	switch (action.type) {
		case actions.UPDATE_PRODUCT.SUCCESS:
		case actions.ADD_PRODUCT.SUCCESS:
			return {
				...state,
				[action.id]: {
					name: action.name,
					price: action.price,
					currency: action.currency
				}
			}
		case actions.DELETE_PRODUCT.SUCCESS:
			return omit([action.id], state)
	}

	return state
}

export const reducers = combineReducers({ permissions, products })
