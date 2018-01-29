import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


export class TrackList extends React.Component {

	render() {
		return (
			<div className="TrackList">
    			{this.props.tracks.map(track => <Track 
    				key={track.id}
    				name={track.name}
    				artist={track.artist}
    				album={track.album}
    				onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
    			/>

    			)}
			</div>
		);
	}
}

export default TrackList;