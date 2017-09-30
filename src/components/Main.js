import React, { Component } from 'react';
import DataChart  from './DataChart';
import InfoBox from './InfoBox';

export default class Main extends Component {
	render() {
		return (
			<div>
				<DataChart  data={ this.props.dataChart }/>

				<InfoBox  valorPrincipal={this.props.forksValue} label={"Forks"}/>
				<InfoBox valorPrincipal={this.props.starsValue} label={"Stars"} />
				<InfoBox valorPrincipal={this.props.contribValue} label={"Contribuitors"} />
			</div>
		);
	}
}