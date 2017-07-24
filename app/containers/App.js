import React from 'react'
import styles from '../resources/css/App.css'

import { connect } from "react-redux"
import { checkPermission, addProduct, deleteProduct } from '../actions'

import ProductForm from '../components/ProductForm'
import ProductsList from '../components/ProductsList'

class App extends React.Component {
	constructor (props) {
		super(props)

		this.onProductSubmit = this.onProductSubmit.bind(this)
		this.onDeleteItem = this.onDeleteItem.bind(this)
	}

	shouldComponentUpdate (nextProps) {
		return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
	}

	onProductSubmit ({ name, price, currency }) {
		const { checkPermission, addProduct } = this.props

		checkPermission('CREATE', () => {
			const productId = `product-${new Date().getTime()}`
			addProduct(productId, name, price, currency)
		}, () => {
			alert('You are not allowed to submit new items.')
		})
	}

	onDeleteItem (id) {
		const { checkPermission, deleteProduct } = this.props

		confirm("Are you sure you want to delete this product?") &&
		checkPermission('DELETE', () => {
			deleteProduct(id)
		}, () => {
			alert('You are not allowed to delete items.')
		})
	}

	render () {
		return (
			<div className={styles.app}>
				<ProductForm
					title="Add new item"
					buttonLabel="Add Item"
					onSubmit={ this.onProductSubmit }	/>

				<ProductsList
					products={ this.props.products }
					onDelete={ this.onDeleteItem }/>
			</div>
		)
	}
}

App.propTypes = {
	addProduct: React.PropTypes.func.isRequired,
	checkPermission: React.PropTypes.func.isRequired,
	products: React.PropTypes.object.isRequired
}

export default connect(function (state) {
	return {
		products: state.products
	}
}, {
	checkPermission, addProduct, deleteProduct
})(App)
