import React from 'react'
import WithPermission from '../containers/WithPermission'

const DeleteButton = ({ onClick }) => (
	<button onClick={ onClick }>Delete Item</button>
)

DeleteButton.propTypes = {
	onClick: React.PropTypes.func.isRequired
}

export default WithPermission(DeleteButton, 'DELETE')
