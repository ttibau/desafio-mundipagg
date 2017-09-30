import React, { Component } from 'react';
import '../style/Index.css'


export default class InfoBox extends Component {
	render() {
		return (
			<div>
				{this.props.label} = {this.props.valorPrincipal}
			</div>
		);
	}
}