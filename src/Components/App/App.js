import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [
			{name: 'Im only Human After All', artist: 'John Jones', album: 'Im only Human After All'}
			]
			playlistName: 'Codecademy Playlist',
			playlistTracks: [{name: 'Not Today', artist: 'Sevendust', album: 'Kill The Flaw'}]
		}
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
			this.setState(playlistTracks: newPlaylist);
		}
	}

	render() {
		return (
			<div>
  				<h1>Ja<span className="highlight">mmm</span>ing</h1>
  				<div className="App">
    				<SearchBar />
    				<div className="App-playlist">
      					<SearchResults searchResults={this.state.searchResults} />
      					<Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    				</div>
  				</div>
			</div>
		);
	}
}