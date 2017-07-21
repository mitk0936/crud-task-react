import { all, call, takeEvery, fork, put, select } from "redux-saga/effects"
import * as actions from '../actions'
import * as api from '../services/api'

console.log(actions)

export function* updatePermissions () {
	const { permissions } = yield call(api.fetchPermissions)

	if (permissions) {
		console.log('Updated permissions', permissions)
	} else {
		console.log('Cannot Update permissions', permissions)
	}
}

export function* watchProductsActions () {
	yield call(updatePermissions)

	yield takeEvery(actions.CHECK_PERMISSION, function* ({ permissionType, success, failure }) {
		yield call(updatePermissions)
		// select permissions from store
		// check if allowed -> success, failure callbacks
	})
}

export function* sagas() {
	yield all([
		fork(watchProductsActions),
	])
}
