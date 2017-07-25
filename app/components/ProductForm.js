import React from 'react'
import WithPermission from '../containers/WithPermission'

const defaultInputValues = {
	name: '',
	price: '',
	currency: ''
}

class ProductForm extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			inputValues: props.defaultInputValues
		}

		this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	onInputChange (key, e) {
		this.setState({
			inputValues: {
				...this.state.inputValues,
				[key]: e.target.value
			}
		})
	}

	onFormSubmit (e) {
		e.preventDefault()

		const 	name = e.target.querySelector("[name='name']").value,
				price = parseFloat(e.target.querySelector("[name='price']").value),
				currency = e.target.querySelector("[name='currency']").value

		this.props.onSubmit({ name, price, currency })
	}

	render () {
		const { title, buttonLabel } = this.props

		return (
			<form type='POST' onSubmit={ this.onFormSubmit }>
				{
					title ?
						<h2>{ title } </h2> : null
				}

				<input type='text' required={ true } placeholder="Name" name='name'
					value={ this.state.inputValues.name }
					onChange={ (e) => this.onInputChange('name', e) }/>

				<input type='number' required={ true } step="0.01" min={ 0 } placeholder="Price" name='price'
					value={ this.state.inputValues.price }
					onChange={ (e) => this.onInputChange('price', e) } />

				<select name='currency'
					value={ this.state.inputValues.currency }
					onChange={ (e) => this.onInputChange('currency', e) }>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="BGN">BGN</option>
				</select>

				<input type="submit" value={ buttonLabel } />
			</form>
		)
	}
}

ProductForm.propTypes = {
	onSubmit: React.PropTypes.func.isRequired,
	title: React.PropTypes.string,
	buttonLabel: React.PropTypes.string.isRequired,
	defaultInputValues: React.PropTypes.shape({
		name: React.PropTypes.string,
		price: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		currency: React.PropTypes.string
	})
}

ProductForm.defaultProps = {
	defaultInputValues: defaultInputValues
}

export const ProductCreateForm = WithPermission(ProductForm, 'CREATE')
export const ProductUpdateForm = WithPermission(ProductForm, 'UPDATE')
