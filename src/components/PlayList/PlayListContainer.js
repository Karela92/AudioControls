import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedTrack, updateTrackList } from '../../store/PlayList/actions';

import PlayList from './PlayList'

import './PlayList.css';

class PlayListContainer extends Component {

  render() {
    return (
      <PlayList
        selectedTrack={ this.props.selectedTrack }
        trackList={ this.props.trackList }
        getSelectedTrack={ this.props.getSelectedTrack }
        updateTrackList={ this.props.updateTrackList }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedTrack: state.playList.selectedTrack,
    trackList: state.playList.trackList,
  }
};

const mapDispatchToProps = {
  getSelectedTrack,
  updateTrackList
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayListContainer);
