import React from 'react'
import WithPermission from '../containers/WithPermission'

const UpdateButton = ({ onClick }) => (
	<button onClick={ onClick }>Update Item</button>
)

UpdateButton.propTypes = {
	onClick: React.PropTypes.func.isRequired
}

export default WithPermission(UpdateButton, 'UPDATE')
