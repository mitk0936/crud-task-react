import 'isomorphic-fetch'

export const fetchPermissions = () =>
	fetch('/permissions')
		.then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server")
			}
			return response.json()
		})
		.then(function (response) {
			return {
				permissions: response.permissions
			}
		}).catch(function (e) {
			Promise.reject()
		})
