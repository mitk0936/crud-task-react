import React from 'react'
import styles from '../resources/css/App.css'

import { connect } from "react-redux"
import { addProduct, deleteProduct, updateProduct } from '../actions'

import { ProductCreateForm } from '../components/ProductForm'
import ProductsList from '../components/ProductsList'

class App extends React.Component {
	constructor (props) {
		super(props)

		this.onProductSubmit = this.onProductSubmit.bind(this)
		this.onDeleteItem = this.onDeleteItem.bind(this)
		this.onUpdateItem = this.onUpdateItem.bind(this)
	}

	shouldComponentUpdate (nextProps) {
		return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
	}

	onProductSubmit ({ name, price, currency }) {
		const { addProduct } = this.props

		addProduct({
			id: `product-${new Date().getTime()}`,
			name,
			price,
			currency,
			onRequestFailure: () => alert('You are not allowed to submit new product items.')
		})
	}

	onDeleteItem (id) {
		const { deleteProduct } = this.props

		deleteProduct({
			id,
			onRequestFailure: () => alert('You are not allowed to delete product items.')
		})
	}

	onUpdateItem ({ id, name, price, currency }) {
		const { updateProduct } = this.props

		updateProduct({
			id,
			name,
			price,
			currency,
			onRequestFailure: () => alert('You are not allowed to update prduct items.')
		})
	}

	render () {
		return (
			<div className={styles.app}>
				<ProductCreateForm
					title="Add new item"
					buttonLabel="Add Item"
					onSubmit={ this.onProductSubmit }	/>

				<ProductsList
					products={ this.props.products }
					onDelete={ this.onDeleteItem }
					onUpdate={ this.onUpdateItem } />
			</div>
		)
	}
}

App.propTypes = {
	addProduct: React.PropTypes.func.isRequired,
	deleteProduct: React.PropTypes.func.isRequired,
	updateProduct: React.PropTypes.func.isRequired,
	products: React.PropTypes.object.isRequired
}

export default connect(function (state) {
	return {
		products: state.products
	}
}, {
	addProduct: addProduct.request,
	deleteProduct: deleteProduct.request,
	updateProduct: updateProduct.request
})(App)
