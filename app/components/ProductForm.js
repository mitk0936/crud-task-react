import React from 'react'
import WithPermission from '../containers/WithPermission'

const ProductForm = ({ onSubmit, title, buttonLabel }) => {
	return (
		<form type='POST' onSubmit={ (e) => {
			const   name = e.target.querySelector("[name='name']").value,
					price = parseFloat(e.target.querySelector("[name='price']").value),
					currency = e.target.querySelector("[name='currency']").value

			e.preventDefault()
			e.target.reset()

			onSubmit({ name, price, currency })
		}}>
			{
				title ?
					<h2>{ title } </h2> : null
			}

			<input type='text' required={true} placeholder="Name" name='name' />
			<input type='number' required={true} step="0.01" min={0} placeholder="Price" name='price' />

			<select name='currency'>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="BGN">BGN</option>
			</select>

			<input type="submit" value={ buttonLabel } />
		</form>
	)
}

ProductForm.propTypes = {
	onSubmit: React.PropTypes.func.isRequired,
	title: React.PropTypes.string,
	buttonLabel: React.PropTypes.string.isRequired
}

export default WithPermission(ProductForm, 'CREATE', null)
