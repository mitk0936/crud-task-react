import { all, call, takeEvery, throttle, fork, put, select } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as actions from '../actions'
import * as api from '../services/api'
import { getPermissions } from './selectors'

export function* fetchPermissions () {
	try {
		const { permissions } = yield call(api.fetchPermissions)
		yield put(actions.permissions.success(permissions));
	} catch (e) {
		yield put(actions.permissions.failure())
		yield call(delay, 5000)
		yield call(fetchPermissions)
	}
}

export function* requestAction (action, apiCall, requestData = {}, onRequestFailure) {
	try {
		const { success } = yield call(apiCall, requestData)

		if (success) {
			yield put(action.success(requestData))
		} else {
			onRequestFailure()
			yield put(action.failure(requestData))
		}

	} catch (e) {
		onRequestFailure()
	}
}

export const addProduct = function* ({ id, name, price, currency, onRequestFailure }) {
	yield fork(requestAction, actions.addProduct, api.addProduct, { id, name, price, currency }, onRequestFailure)
}

export const deleteProduct = function* ({ id, onRequestFailure }) {
	yield fork(requestAction, actions.deleteProduct, api.deleteProduct, { id }, onRequestFailure)
}

export const updateProduct = function* ({ id, name, price, currency, onRequestFailure }) {
	yield fork(requestAction, actions.updateProduct, api.updateProduct, { id, name, price, currency }, onRequestFailure)
}

export function* watchProductActions () {
	yield takeEvery(actions.ADD_PRODUCT.REQUEST, addProduct)
	yield takeEvery(actions.DELETE_PRODUCT.REQUEST, deleteProduct)
	yield takeEvery(actions.UPDATE_PRODUCT.REQUEST, updateProduct)
}

export function* watchUpdatePermissions () {
	yield throttle(10000, [
		actions.ADD_PRODUCT.REQUEST,
		actions.DELETE_PRODUCT.REQUEST,
		actions.UPDATE_PRODUCT.REQUEST
	], fetchPermissions)
}

export function* sagas() {
	yield all([
		fork(fetchPermissions),
		fork(watchProductActions),
		fork(watchUpdatePermissions)
	])
}
