import { all, call, takeEvery, fork, put, select } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as actions from '../actions'
import * as api from '../services/api'
import { getPermissions } from './selectors'

export function* updatePermissions () {
	try {
		const { permissions } = yield call(api.fetchPermissions)
		yield put(actions.permissions.success(permissions));
	} catch (e) {
		yield put(actions.permissions.failure())
		yield call(delay, 5000)
		yield call(updatePermissions)
	}
}

export function* checkPermission ({ permissionType, success, failure }) {
	yield call(updatePermissions)
	const permissions = yield select(getPermissions)
	permissions[permissionType] ? success() : failure()
}

export function* watchRequestPermissions () {
	yield takeEvery(actions.CHECK_PERMISSION, checkPermission)
}

export function* sagas() {
	yield all([
		fork(updatePermissions),
		fork(watchRequestPermissions)
	])
}
