import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import '../style/DataChart.css';


export default class DataChart extends Component {

	state = {
		chartData: {
		
			labels: [],
			datasets: [
		    {
		      label: 'Commits',
		      fill: false,
		      lineTension: 0.1,
		      backgroundColor: '#b62b5f',
		      borderColor: '#b62b5f',
		      borderCapStyle: 'butt',
		      borderDash: [],
		      borderDashOffset: 0.0,
		      borderJoinStyle: 'miter',
		      pointBorderColor: '#b62b5f',
		      pointBackgroundColor: '#fff',
		      pointBorderWidth: 1,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: '#b62b5f',
		      pointHoverBorderColor: '#b62b5f',
		      pointHoverBorderWidth: 2,
		      pointRadius: 1,
			  pointHitRadius: 10,
			  responsive: true,
		      data: []
		    }
		  ]
		}
	}

	componentWillReceiveProps(props){
		// Os dados que serao passados pro state virao da propriedade data que vem no index
		const data = {
			...this.state.chartData
		}
		data.datasets[0].data = props.data;	// Adiciono ao state, dentro de datasets.data o valor vindo da prop
		data.labels = props.label;
		this.setState({
			chartData: data
		})
	}

	render() {
		return <Line data={this.state.chartData} />
	}
}