import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: 'New Playlist',
			playlistTracks: []
		}
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(track) {
		let addTrack;
		if(this.state.playlistTracks.length !== 0) {
			const ids = this.collectIds();
			let newId = true;
			for(let i = 0; i < ids.length; i++) {
				if(ids[i] === track.id) {
					newId = false;
				}
			}
			if(newId) {
				addTrack = (track) => this.setState({playlistTracks: [...this.state.playlistTracks, track]});
			}
		} else {
			addTrack = (track) => this.setState({playlistTracks: [...this.state.playlistTracks, track]});
		}
		addTrack(track);
	}

	removeTrack(track) {
		const ids = this.collectIds();
		let trackIndex = -1;
		for(let i = 0; i < ids.length; i++) {
			if (ids[i] === track.id) {
				trackIndex = i;
			}
		}
		if (trackIndex !== -1) {
			const newPlaylist = this.state.playlistTracks;
			newPlaylist.splice(trackIndex, 1);
			this.setState({playlistTracks: newPlaylist});
		}
	}

	collectIds() {
		let playlistIds = [];
		this.state.playlistTracks.map(track => playlistIds.push(track.id));
		return playlistIds;
	}

	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}

	savePlaylist() {
		let trackURIs = [];
		for(let i = 0; i < this.state.playlistTracks.length; i++) {
			trackURIs.push(this.state.playlistTracks[i].uri);
		}
		Spotify.savePlaylist(this.state.playlistName, trackURIs);
		this.setState({playlistName: 'New Playlist', playlistTracks: []});
	}

	async search(term) {
		const results = await Spotify.search(term);
		this.setState({searchResults: results});
	}

	render() {
		return (
			<div id="root">
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

export default App;