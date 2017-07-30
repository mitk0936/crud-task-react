import React from 'react'
import { connect } from "react-redux"

class Wrapper extends React.Component {
	
	shouldComponentUpdate (nextProps) {
		return (JSON.stringify(this.props) !== JSON.stringify(nextProps))
	}

	render () {
		const { permissions, permissionId, WrrappedComponent } = this.props
		const allowedToRender = (permissions[permissionId] === true)

		return (
			<span>
				{
					allowedToRender ? <WrrappedComponent { ...this.props } /> : null
				}
			</span>
		)
	}
}

const childrenTypes = React.PropTypes.oneOfType([
	React.PropTypes.arrayOf(React.PropTypes.node),
	React.PropTypes.node,
	React.PropTypes.func
]);

Wrapper.propTypes = {
	permissionId: React.PropTypes.string.isRequired,
	WrrappedComponent: childrenTypes.isRequired,
	permissions: React.PropTypes.shape({
		'CREATE': React.PropTypes.bool.isRequired,
		'READ': React.PropTypes.bool.isRequired,
		'UPDATE': React.PropTypes.bool.isRequired,
		'DELETE': React.PropTypes.bool.isRequired
	}).isRequired
}

const WithPermission = (WrrappedComponent, permissionId) => {
	return connect(function mapStateToProps (state) {
		return {
			permissionId,
			WrrappedComponent,
			permissions: state.permissions
		}
	})(Wrapper)
}

export default WithPermission
