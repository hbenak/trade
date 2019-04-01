import './Search.css'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import icoSearch from '../../assets/imgs/ic_Search@2x.png.png'

let searchText = ""

class Search extends Component {
	searchTerm = () => {
		console.log('BUSCAR');
		console.log(searchText);

		this.props.history.push('/items?search='+searchText)
	}

	render() {
		return(
			<div className="search-box">
			
				<input type="text" className="search-input" id="q" placeholder="Nunca dejes de buscar" name="q" onChange={(e) => { searchText = e.target.value }} />
				<button className="search-button" onClick={this.searchTerm}>
					<span>Buscar</span>
					<img src={icoSearch} alt="buscar" />
				</button>
			
			</div>
		)
	}
}

export default withRouter(Search)