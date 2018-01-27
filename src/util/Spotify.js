let accessToken = '';
let expiresIn;
const clientId = '86f8f621d81a4ce18bd21da9fd2da2b1';
const redirectURI = 'http://localhost:3000/';

function Spotify() {
	function getAccessToken() {
		if(accessToken != '') {
			return accessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) != null){
			accessToken = window.location.href.match(/access_token=([^&]*)/);
			expiresIn = window.location.href.match(/expires_in=([^&]*)/);
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = 'https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}';
		}

		async function search(term) {
  		try {
    		let response = await fetch('https://api.spotify.com/v1/search?type=track&q=${term}', {
      		method: 'GET',
     			headers: {
      		  Authorization: `Bearer ${accessToken}`
      		}
    		});
    		if (response.ok) {
     			let jsonResponse = await response.json();
     			let tracks = jsonResponse.map(track => ({
     				id: track.id,
     				name: track.name,
     				artist: track.artists[0].name,
     				album: track.album.name,
     				uri: track.uri
     			}));
     			return tracks;
   			}
  		} catch (error) {
   			console.log(error);
 			}
		}

		function savePlaylist(name, trackURIs) {
			if (name === undefined || trackURIs === undefined) {
				return;
			} else {
				let userAccessToken = accessToken;
				let headers = {Authorization: userAccessToken};
				let userId = findUserId(headers);
				let playlistID;
				fetch('https://api.spotify.com/v1/users/${userId}/playlists', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": 'application/json'
					},
					body: {
						name: name
					}
				}).then(response => {return response.json()}
				).then(playlist => {
					playlistID = playlist.id;
				});
			}
		}

		function findUserId(headers) {
			let id;
			fetch('https://api.spotify.com/v1/me', {headers: headers}
				).then(response => {return response.json()}
				).then(jsonResponse => {
					id = jsonResponse[0].id;
				});
				return id;
		}
	}
}

export default Spotify;