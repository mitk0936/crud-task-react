import { all, take, fork, put, select } from "redux-saga/effects"

export function* watcher () {
	console.log('watcher waked up')
}

export function* sagas() {
	yield all([
		fork(watcher),
	])
}
