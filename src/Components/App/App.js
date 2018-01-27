import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotfiy from '../../util/Spotify.js';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [];
			playlistName: 'New Playlist',
			playlistTracks: [{name: 'Not Today', artist: 'Sevendust', album: 'Kill The Flaw'}]
		}
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	checkIds(id, ids) {
		const idIndex = ids.length - 1;
		const trackId = ids[idIndex];
		return id !== trackId;
	}

	addTrack(track) {
		const ids = Playlist.collectIds(this.state.playlistTracks);
		ids.push(track.id);
		if (ids.every(checkIds(id, ids))) {
			const newPlaylist = this.state.playlistTracks.push(track);
			this.setState({playlistTracks: newPlaylist});
		}
	}

	removeTrack(track) {
		const ids = Playlist.collectIds(this.state.playlistTracks);
		let trackIndex = -1;
		for(let i = 0; i < ids.length; i++) {
			if (ids[i] === track.id) {
				trackIndex = i;
			}
		}
		if (trackIndex != -1) {
			const newPlaylist = this.state.playlistTracks.splice(trackIndex, 1);
			this.setState({playlistTracks: newPlaylist});
		}
	}

	updatePlaylistName(name) {
		this.setState(playlistName: name);
	}

	savePlaylist() {
		let trackURIs = [];
		for(let i = 0; i < playlistTracks.length; i++) {
			trackURIs.push(playlistTracks[i].uri);
		}
		Spotify.savePlaylist(this.state.playlistName, trackURIs);
		this.setState({playlistName: 'New Playlist', searchResults: []});
	}

	search(term) {
		Spotify.search(term);
	}

	render() {
		return (
			<div>
  				<h1>Ja<span className="highlight">mmm</span>ing</h1>
  				<div className="App">
    				<SearchBar onSearch={this.search} />
    				<div className="App-playlist">
      					<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
      					<Playlist 
      						playlistName={this.state.playlistName}
      						playlistTracks={this.state.playlistTracks}
      						onRemove={this.removeTrack}
      						onNameChange={this.updatePlaylistName}
      						onSave={this.savePlaylist}
      					/>
    				</div>
  				</div>
			</div>
		);
	}
}