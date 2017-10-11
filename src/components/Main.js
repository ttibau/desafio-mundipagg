import React, { Component } from 'react';
import DataChart  from './DataChart';
import InfoBox from './InfoBox';
import '../style/InfoBox.css';
import {FaStar, FaCodeFork, FaUserPlus} from 'react-icons/lib/fa';
import '../style/flexboxgrid.css';


export default class Main extends Component {
	render() {
		return (
			<div>	
				<InfoBox valorPrincipal={this.props.starsValue} label={"Stars"} icon={<FaStar />} />
				<InfoBox valorPrincipal={this.props.forksValue} label={"Forks"} icon={<FaCodeFork />}/>
				<InfoBox valorPrincipal={this.props.contribValue} label={"Contributors"} icon={<FaUserPlus />} />
			</div>
		);
	}
}
