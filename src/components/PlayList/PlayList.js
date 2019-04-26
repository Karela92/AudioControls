import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PlayList.css';
import moment from 'moment/moment';

export default class PlayList extends Component {

  static propTypes = {
    getSelectedTrack: PropTypes.func.isRequired,
    selectedTrack: PropTypes.object.isRequired,
    trackList: PropTypes.array.isRequired,
    updateTrackList: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      filterSearch: ''
    }
  }

  getSelectedTrack(track, trackIndex) {
    const isSameSelectedTrack = track === this.props.selectedTrack;
    this.props.getSelectedTrack(track, trackIndex, isSameSelectedTrack);
  }

  getFilteredPlayList() {
    const { filterSearch } = this.state;
    const { trackList } = this.props;
    if (!filterSearch) {
      return trackList;
    }

    const filteredTrackList = trackList.filter(
      track =>
        track.trackArtist.toLowerCase().includes(filterSearch) ||
        track.trackName.toLowerCase().includes(filterSearch)
    );

    this.props.updateTrackList(filteredTrackList);

    return filteredTrackList;
  }

  handleFilterChange(event) {
    this.setState({
      filterSearch: event.target.value.toLowerCase()
    });
  }

  renderFilter() {
    return (
      <div className='filter'>
        <input
          type='text'
          placeholder='Search artists or tracks'
          onChange={(event) => this.handleFilterChange(event)}
        />
      </div>
    )
  }

  renderPlayList() {
    const filteredPlayList = this.getFilteredPlayList();
    return (
      <div className='playList'>
        { filteredPlayList.length ?
          filteredPlayList.map((track, index) => {
            return (
              <div className='track' key={ index } onClick={ () => this.getSelectedTrack(track, index) } >
                <div> { `${ track.trackArtist } - ${ track.trackName }` }</div>
                <div> { moment.utc(moment.duration(track.trackDuration,'s').asMilliseconds()).format('mm:ss')  } </div>
              </div>
            )
          }) :
        'Результатов по вашему запросу нет' }
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.renderFilter() }
        { this.renderPlayList() }
      </div>
    )
  }
}
