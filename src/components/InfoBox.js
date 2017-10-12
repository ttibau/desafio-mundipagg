import React, { Component } from 'react';
import '../style/InfoBox.css';


export default class InfoBox extends Component {
	render() {
		return (
				<div className="box">
					<h3>{this.props.label}</h3>
					<p>{this.props.valorPrincipal}</p>
					<i>{this.props.icon}</i>
				</div>
		);
	}
}