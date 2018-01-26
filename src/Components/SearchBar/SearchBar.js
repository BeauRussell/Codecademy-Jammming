import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''};
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	search() {
		this.props.onSearch(this.state.term);
	}

	handleTermChange(event) {
		this.setState({term: setState});
	}

	render() {
		return(
			<div className="SearchBar">
  				<input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
  				<a>SEARCH</a>
			</div>
		);
	}
}
