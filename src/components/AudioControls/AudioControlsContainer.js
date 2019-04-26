import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSelectedTrack } from '../../store/PlayList/actions';

import AudioControls from './AudioControls'

class AudioControlsContainer extends Component {

  render() {
    return (
      <AudioControls
        { ...this.props.playList }
        getSelectedTrack={ this.props.getSelectedTrack }
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
};

const mapDispatchToProps = {
  getSelectedTrack
};


export default connect(mapStateToProps, mapDispatchToProps)(AudioControlsContainer);
