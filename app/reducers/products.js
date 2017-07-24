import * as actions from '../actions'
import { omit } from '../utils'

const products = (state = {}, action) => {
	switch (action.type) {
		case actions.ADD_PRODUCT:
			return {
				...state,
				[action.id]: {
					name: action.name,
					price: action.price,
					currency: action.currency
				}
			}
		case actions.DELETE_PRODUCT:
			return omit([action.id], state)
	}

	return state
}

export default products
