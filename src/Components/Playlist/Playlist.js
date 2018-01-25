import React from 'react';
import './Playlist.js';


export class Playlist extends React.Component {
	constructor(props) {
		super(props);
	}

	collectIds(playlistTracks) {
		let playlistIds = [];
		playlistTracks.map(track => playlistIds.push(track.id));
		return playlistIds;
	}

	render() {
		return (
			<div className="Playlist">
  				<input defaultValue="New Playlist"/>
  				<TrackList playlistTracks={this.props.playlistTracks} />
  				<a className="Playlist-save">SAVE TO SPOTIFY</a>
			</div>
		);
	}
}
