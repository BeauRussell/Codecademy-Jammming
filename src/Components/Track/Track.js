import React from 'react';
import './Track.css';


export class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	renderAction() {
		if(this.props.isRemoval) {
			return <a className='Track-action'>-</a>
		} else {
			return <a className='Track-action'>+</a>
		}
	}

	render() {
		return(
			<div className="Track">
  				<div className="Track-information">
    				<h3><!-- track name will go here --></h3>
    				<p><!-- track artist will go here--> | <!-- track album will go here --></p>
  				</div>
  				<a className="Track-action" onClick={this.addTrack}>+</a>
			</div>
		);
	}
}