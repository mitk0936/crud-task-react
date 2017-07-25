import React from 'react'
import WithPermission from '../containers/WithPermission'
import DeleteButton from './DeleteButton'
import { ProductUpdateForm } from './ProductForm'

const ProductsList = ({ products, onDelete, onUpdate }) => {
	return (
		<table>
			<thead>
			{
				Object.keys(products).length ?
					<tr key="items-table-head">
						<th>
							Nr.
						</th>
						<th>
							<b>Name</b>
						</th>
						<th>
							<b>Price</b>
						</th>
						<th>
							<b>Currency</b>
						</th>
						<th>
							<b>Update</b>
						</th>
						<th>
							<b>Delete</b>
						</th>
					</tr> : null
			}
			</thead>
			<tbody>
				{
					Object.keys(products).map((productId, index) => {
						const { name, price, currency } = products[productId]

						return (
							<tr key={productId} >
								<td>
									{ index + 1 }
								</td>
								<td>
									{ name }
								</td>
								<td>
									{ price }
								</td>
								<td>
									{ currency }
								</td>
								<td>
									<ProductUpdateForm
										defaultInputValues={{ name, price, currency }}
										buttonLabel="Update Item"
										onSubmit={ ({ name, price, currency }) => onUpdate({ id: productId, name, price, currency }) } />
								</td>
								<td>
									<DeleteButton onClick={ (e) => onDelete(productId) } />
								</td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
}

ProductsList.propTypes = {
	products: React.PropTypes.object.isRequired,
	onDelete: React.PropTypes.func.isRequired,
	onUpdate: React.PropTypes.func.isRequired
}

export default WithPermission(ProductsList, 'READ')
