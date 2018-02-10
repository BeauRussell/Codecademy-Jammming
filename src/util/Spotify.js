let accessToken;
let expiresIn;
const clientId = '86f8f621d81a4ce18bd21da9fd2da2b1';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
	getAccessToken() {
		if(accessToken) {
			return accessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) != null){
			accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
			expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
		}
	},

		async search(term) {
			if(accessToken === undefined) {
				this.getAccessToken();
			}
  		try {
    		let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      		method: 'GET',
     			headers: {
      		  Authorization: `Bearer ${accessToken}`
      		}
    		});
    		if (response.ok) {
     			let jsonResponse = await response.json();
     			let tracks = jsonResponse.tracks.items.map(track => ({
     				id: track.id,
     				name: track.name,
     				artist: track.artists[0].name,
     				album: track.album.name,
     				uri: track.uri,
     				preview: track.preview_url
     			}));
     			return tracks;
   			}
  		} catch (error) {
   			console.log(error);
 			}
		},

		async savePlaylist(name, trackURIs) {
			if(accessToken === undefined) {
				this.getAccessToken();
			}
			if (name === undefined || trackURIs === undefined) {
				return;
			} else {
				let userId = await this.findUserId();
				let playlistID;
				fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": 'application/json'
					},
					body: JSON.stringify({name: name})
				}).then(response => {return response.json()}
				).then(playlist => {
					playlistID = playlist.id;
					this.addTracks(playlistID, trackURIs, userId);
				});
			}
		},

		addTracks(playlistID, trackURIs, userId) {
			fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": 'application/json'
				},
				body: JSON.stringify({uris: trackURIs})
			});
		},

		findUserId() {
			if(accessToken === undefined) {
				this.getAccessToken();
			}
			let userId;
			return fetch(`https://api.spotify.com/v1/me`, {headers: {
				Authorization: `Bearer ${accessToken}`
			}}
				).then(response => {return response.json()}
				).then(jsonResponse => {
					userId = jsonResponse.id;
					return userId;
				});
		}
	};

export default Spotify;