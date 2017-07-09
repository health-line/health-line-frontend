import React, {Component} from "react";
import {connect} from 'react-refetch';
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import settings from "../../settings";
import './Authentification.css';

class Authentification extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: ''
		};
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleAuthentification = this.handleAuthentification.bind(this);
	}

	handleChangeUsername(event) {
		this.setState({username: event.target.value});
	}

	handleChangeEmail(event) {
		this.setState({email: event.target.value});
	}

	handleChangePassword(event) {
		this.setState({password: event.target.value});
	}

	handleAuthentification() {
		if (this.props.register) {
			const body = {
				username: this.state.username,
				email: this.state.email,
				password: this.state.password
			};
			this.props.register(body);
		}
		else {
			const body = {
				email: this.state.email,
				password: this.state.password
			};
			this.props.login(body);
		}
	}

	render() {
		return (
			<div className="authentification-view">
				<form className="authentification-form">
					<TextField
						floatingLabelText="Username"
						value={this.state.username}
						onChange={this.handleChangeUsername}
						type="text"
						fullWidth={true}/>
					<TextField
						floatingLabelText="E - Mail"
						value={this.state.email}
						onChange={this.handleChangeEmail}
						type="email"
						fullWidth={true}/>
					<TextField
						floatingLabelText="Password"
						value={this.state.password}
						onChange={this.handleChangePassword}
						type="password"
						fullWidth={true}/>
					<RaisedButton
						label="Register"
						onclick={this.handleAuthentification}
						className="authetification-button"
						primary={true}
						fullWidth={true} />
				</form>
			</div>
		);
	}
}

export default connect(props => ({
	register: body => ({
		registerResponse: {
			url: settings.backendUrl + `/account/create`,
			method: 'POST',
			body: JSON.stringify(body)
		}
	}),
	login: body => ({
		loginResponse: {
			url: settings.backendUrl + `/account/login`,
			method: 'POST',
			body: JSON.stringify(body)
		}
	})
}))(Authentification);
