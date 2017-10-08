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
				<div className="row">
					<div className="col-xs-4">
						<InfoBox valorPrincipal={this.props.starsValue} label={"Stars"} icon={<FaStar />} />
					</div>
					<div className="col-xs-4">
						<InfoBox valorPrincipal={this.props.forksValue} label={"Forks"} icon={<FaCodeFork />}/>
					</div>
					<div className="col-xs-4">
						<InfoBox valorPrincipal={this.props.contribValue} label={"Contributors"} icon={<FaUserPlus />} />
					</div>
				</div>

				<div className="row">
					<div className="col-xs">
						<div className="box">
							<div className="row">
								<div className="col-xs">
									<div className="box">auto</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<DataChart  data={ this.props.dataChart } label={this.props.labelChart} />
				</div>
			</div>
		);
	}
}
