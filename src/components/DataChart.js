import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import '../style/DataChart.css';
import { Grid, Row} from 'react-flexbox-grid';


export default class DataChart extends Component {

	state = {
		chartData: {
		
			labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			datasets: [
		    {
		      label: 'Commits',
		      fill: false,
		      lineTension: 0.1,
		      backgroundColor: 'rgba(75,192,192,0.4)',
		      borderColor: 'rgba(75,192,192,1)',
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: 'rgba(75,192,192,1)',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
		      pointRadius: 1,
		      pointHitRadius: 10,
		      data: []
		    }
		  ]
		}
	}

	componentWillMount() {

		// Os dados que serao passados pro state virao da propriedade data que vem no index
		const data = {
			...this.state.chartData
		}
		data.datasets[0].data = this.props.data;	
		this.setState({
			chartData: data
		})
	}

	render() {
		return (
			<Grid fluid>
				<Row>
					<Line data={this.state.chartData} />
				</Row>
			</Grid>
		);
	}
}