import React from 'react';
import './Playlist.js';
import TrackList from '../Components/TrackList/TrackList';


export class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.onNameChange = this.onNameChange.bind(this);
	}

	collectIds(playlistTracks) {
		let playlistIds = [];
		playlistTracks.map(track => playlistIds.push(track.id));
		return playlistIds;
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className="Playlist">
  				<input defaultValue="New Playlist" onChange={this.handleNameChange} />
  				<TrackList playlistTracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
  				<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}
