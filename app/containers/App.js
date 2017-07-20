import React from 'react';
import { connect } from "react-redux"
import styles from '../css/App.css';

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = { test: 'foo' };
	}

	render () {
		console.log(this.props)

		return (
			<div className={styles.app}>
				Test APP
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {})(App)
