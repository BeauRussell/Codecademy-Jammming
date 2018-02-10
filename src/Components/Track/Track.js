import React from 'react';
import './Track.css';


export class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.renderAction = this.renderAction.bind(this);
		this.playPreview = this.playPreview.bind(this);
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track, true);
	}

	renderAction() {
		if(this.props.isRemoval) {
			this.removeTrack();
		} else {
			this.addTrack();
		}
	}

	playPreview() {
		window.open(this.props.preview);
	}

	render() {
		return(
			<div className="Track">
  				<div className="Track-information">
    				<h3>{this.props.name}</h3>
    				<p>{this.props.artist} | {this.props.album}</p>
    				<a onClick={this.playPreview}>preview</a>
  				</div>
  				<a className="Track-action" onClick={this.renderAction}>+</a>
			</div>
		);
	}
}

export default Track;