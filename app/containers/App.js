import React from 'react'
import { connect } from "react-redux"
import styles from '../resources/css/App.css'
import { permissions } from '../actions'

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = { test: 'foo' }
	}

	render () {
		console.log(this.props)

		return (
			<div className={styles.app}>
				Test APP
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		permissions: state.permissions
	}
}

export default connect(mapStateToProps, {})(App)
