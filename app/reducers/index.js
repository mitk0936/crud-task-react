import { combineReducers } from "redux"

const user = (state = {}, action = { type }) => {
	console.log(action.type)
	return state
}

export const reducers = combineReducers({ user });
