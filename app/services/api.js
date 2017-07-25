import 'isomorphic-fetch'

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
}

const handleBadResponse = function (response) {
	if (response.status >= 400) {
		throw new Error("Bad response from server")
	}
	return response.json()
}

export const fetchPermissions = () =>
	fetch('/permissions', {
		method: 'GET',
		headers
	})
	.then(handleBadResponse)
	.then(function (response) {
		return {
			permissions: response.permissions || []
		}
	})

export const submitProduct = (apiUrl, productData = { id, name, price, currency }) =>
	fetch(apiUrl, {
		method: 'POST',
		body: JSON.stringify(productData),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then(handleBadResponse)
	.then(function (response) {
		return {
			success: response.success
		}
	})

export const deleteProduct = (productData = { id }) =>
	fetch('/delete-product', {
		method: 'DELETE',
		body: JSON.stringify(productData),
		headers
	})
	.then(handleBadResponse)
	.then(function (response) {
		return {
			success: response.success
		}
	})

export const updateProduct = (productData = { id, name, price, currency }) => submitProduct('/update-product', productData)
export const addProduct = (productData = { id, name, price, currency }) => submitProduct('/add-product', productData)
