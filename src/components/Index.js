import React, { Component } from 'react';
import '../style/Index.css';
import logo from '../static/logo.png'
import Request from 'superagent';
import Spinner from 'react-spinkit';
import Main from './Main';
import counterContrib from '../CountContrib';
import isEmptyObject from '../verifyObject';
import counterCommit from '../countCommit';
import Footer from './Footer';
import '../style/flexboxgrid.css';
import DataChart from './DataChart';
import token from '../token'

export default class Index extends Component {

	constructor() {
		super();
		this.state = { 
			repos: [],
			dataLoad: false,
			forksCount: 0,
			starsCount: 0,
			contribCount: 0,
			repoId: '',
			chartLabel: [],
			chartData: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		// Faz a req de todos os repositorios na inicializacao do componente 
		const url = "https://api.github.com/users/mundipagg/repos";
		Request.get(url)
		.set(token())
			.then((data, error) => {
				// Seto a dataLoad pra true, para parar de exibir o Spinner
				this.setState({ dataLoad: true });

				if(error) {
					console.log("Houve erro");
				} else {
					this.setState({ repos: data.body });
				}
			})
	}


	handleChange(event) {
		const url = "https://api.github.com/repos/mundipagg/" + event.target.value;
		Request.get(url)
		.set(token())
			.then((data, error) => {
				if (error){
					console.log("Houve Erro!");
				} else {
					this.setState({ 
						repoId: data.body.id,
						forksCount: data.body.forks_count, 
						starsCount: data.body.stargazers_count 
					});

					/* Retorna os últimos 100 commits */
					counterCommit(data.body.commits_url)
						.then(data => {
							this.setState({
								chartLabel: Object.keys(data),
								chartData: Object.values(data)
							})
						});
					
					/* 
					*	Pega a URL de contributors_url e envia para a função *counterContrib() 
					* 	counterContrib que vai retornar a quantidades de contribuintes no total
					* 	Função objVerified = Verifica se há a paginação em links
					*	Função counterContrib = Retorna uma promisse com a quantidade de contribuidores
					*/
					Request.get(data.body.contributors_url)
					.set(token())
						.then((data, error) => {
							if(error) {
								console.log("Houve um erro!");
							} else {
								let objVerified = isEmptyObject(data.links);
								if(!objVerified){
									counterContrib(data.links.next, data.links.last, this.state.repoId)
										.then(data => {
											const sumValues = obj => Object.values(data).reduce((a, b) => a + b);
											this.setState({ contribCount: this.state.contribCount + sumValues() })
										});
								}
								console.log(typeof(data));
								this.setState({
									contribCount: data.body.length
								});
							}
						})
				}
			})
	}

	renderContent(){

		// Se o dataLoad for false, exibir spinner

		const repositories = this.state.repos.map((repo) => {
			return (
				<option key={repo.id} value={repo.name}>{repo.name}</option>
			);
		});
		
		while(!this.state.dataLoad){
			return <Spinner name="cube-grid" className="spinner" />;
		}
		return (
			<div className="content row center-xs">
				<div className="col-xs-10 col-sm-3">
					<select className="select-box" onChange={this.handleChange}>
						<option>Selecione</option>
						{repositories}
					</select>
				
					{/* O <Main /> vai conter as informações que serão passadas para as Boxes*/}
					<Main 
						forksValue={this.state.forksCount}
						starsValue={this.state.starsCount}
						contribValue={this.state.contribCount}
					/>	
				</div>
				<div className="col-xs-10 col-sm-9">
					{/* O <DataChart /> vai conter os dados que serão passados para o ChartJs*/}
					<DataChart data={ this.state.chartData } label={this.state.chartLabel} />
				</div>
			</div>
		);
			
	}


	render() {
		return (
			<div className="body">
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<header className="header">
					<img src={logo} className="app-logo" alt="Logo" />
					<h2> Desafio Mundipagg - Tibau</h2>
				</header>
				{this.renderContent()}
				<Footer />
			</div>
		);
	}
}
