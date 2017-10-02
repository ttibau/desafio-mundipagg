import React, { Component } from 'react';
import '../style/Index.css';
import logo from '../static/logo.png'
import Request from 'superagent';
import Spinner from 'react-spinkit';
import Main from './Main';
import counterContrib from '../CountContrib';
import isEmptyObject from '../verifyObject';


export default class Index extends Component {

	constructor() {
		super();
		this.state = { 
			repos: [],
			dataLoad: false,
			forksCount: '',
			starsCount: '',
			contribCount: '',
			repoId: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
		// Faz a req de todos os repositorios na inicializacao do componente 
		const url = "https://api.github.com/users/ttibau/repos";
		Request.get(url)
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
		// Pega o valor selecionado no select e faz uma nova request nesse repositorio
		console.log(event.target.value);
		const url = "https://api.github.com/repos/ttibau/" + event.target.value;
		Request.get(url)
			.then((data, error) => {
				if (error){
					console.log("Houve Erro!");
				} else {
					console.log(data.body)
					this.setState({ 
						repoId: data.body.id,
						forksCount: data.body.forks_count, 
						starsCount: data.body.stargazers_count 
					});
					/* 
					*	Faz um GET na url de contribuidores -> Verifica se há mais páginas de contribuidores -> Se houver, chama
					* 	counterContrib que vai retornar a quantidades de contribuintes no total
					* 	Função objVerified = Verifica se há a paginação em links
					*	Função counterContrib = Retorna uma promisse com a quantidade de contribuidores
					*/
					Request.get(data.body.contributors_url)
						.then((data, error) => {
							if(error) {
								console.log("Houve um erro!");
							} else {
								console.log(data);
								let objVerified = isEmptyObject(data.links);
								if(objVerified){
									console.log("Não contém mais de 30");
								} else {
									counterContrib(data.links.next, data.links.last, this.state.repoId)
										.then(data => {
											const sumValues = obj => Object.values(data).reduce((a, b) => a + b);
											this.setState({ contribCount: this.state.contribCount + sumValues() })
										});
									console.log("Contém mais de 30", data.links.next, data.links.last);
								}
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
		
		switch(this.state.dataLoad){
			case true:
				return (
					<div>
						<select className="select-box" onChange={this.handleChange}>
							{repositories}
						</select>

						{/* O componente Main ira exibir os dados no Chart e as boxes com as informacoes de forks, stars, etc */}
						<Main 
							dataChart={ [65, 59, 80, 81, 56, 55, 40] }
							forksValue={this.state.forksCount}
							starsValue={this.state.starsCount}
							contribValue={this.state.contribCount}
						 />	
					</div>
				);
			case false:
				return <Spinner name="cube-grid" className="spinner" />;
			default:
				return <Spinner name="cube-grid" className="spinner" />;
		};
	}


	render() {
		return (
			<div>
				<div className="header">
					<img src={logo} className="app-logo" alt="Logo" />
					<h2> Desafio Mundipagg - Tibau</h2>
				</div>
				{this.renderContent()}
			</div>
		);
	}
}
