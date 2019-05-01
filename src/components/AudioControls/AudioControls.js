import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment'
import PropTypes from 'prop-types';

import nextBtn from '../../assets/next.png';
import prevBtn from '../../assets/prev.png';
import playBtn from '../../assets/play.png';
import pauseBtn from '../../assets/pause.png';

import './AudioControls.css';

export default class AudioControls extends Component {

  static propTypes = {
    getSelectedTrack: PropTypes.func.isRequired,
    selectedTrack: PropTypes.object.isRequired,
    trackList: PropTypes.array.isRequired,
    filteredTrackList: PropTypes.array,
    trackIndex: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.track = new Audio(props.selectedTrack.trackUrl);
    this.progressBarRef = React.createRef();
    this.state = {
      songIsPlayed: false,
      durationProgressBar : 0,
      volumeProgressBar: 100,
      currentTrackTime: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTrack.trackUrl !== this.props.selectedTrack.trackUrl) {
      this.track.src = nextProps.selectedTrack.trackUrl;
      this.track.play();
      this.setState({
        songIsPlayer: false,
        durationProgressBar: 0,
        currentTrackTime: 0
      });
    } else if(nextProps.isSameTrack) {
      this.startPlayTrack();
    }
  }

  componentDidUpdate() {
    if (this.track.ended) {
      this.getPrevOrNextTrack('nextTrack');
    }
  }

  getProgressBarValue(event, progressBarType) {
    const progressBarWidth = this.progressBarRef.current.offsetWidth;
    const selectedSeekBarPercent = Math.ceil(event.nativeEvent.offsetX / progressBarWidth * 100);
    if (progressBarType === 'durationProgressBarWrap') {
      this.track.currentTime = (this.track.duration * selectedSeekBarPercent) / 100;
      this.track.play();
      this.setState({
        durationProgressBar: selectedSeekBarPercent
      })
    } else {
      this.track.volume = selectedSeekBarPercent / 100;
      this.setState({
        volumeProgressBar: selectedSeekBarPercent
      })
    }
  }

  startPlayTrack() {
    if (this.track.paused) {
      this.track.play();

      this.setState({
        songIsPlayed: true
      });
    } else {
      this.track.pause();
      this.setState({
        songIsPlayed: false
      });
    }
  }

  getCorrectTrackIndex(trackListLength, trackIndex) {
    let returnedIndex;
    if (trackIndex < 0) {
      returnedIndex = trackListLength-1
    } else if (trackIndex > trackListLength-1) {
      returnedIndex =  0
    } else {
      returnedIndex = trackIndex;
    }
    return returnedIndex;
  }

  getPrevOrNextTrack(btnName) {
    const { getSelectedTrack, filteredTrackList, trackIndex } = this.props;
    const checkedIndex = btnName === 'prevTrack' ? trackIndex -1 : trackIndex+1;
    const selectedTrackIndex = this.getCorrectTrackIndex(filteredTrackList.length, checkedIndex);
    getSelectedTrack(filteredTrackList[selectedTrackIndex], selectedTrackIndex);
  }

  getCurrentTrackTime() {
    if (!this.track.paused) {
      setTimeout(() => {
        this.setState({
          currentTrackTime:  moment.utc(moment.duration(this.track.currentTime,'s').asMilliseconds()).format('mm:ss'),
          durationProgressBar: this.track.currentTime / (this.track.duration / 100)
        })
      }, 1000);
    }
  }

  renderAudioControlsButtons() {
    const { songIsPlayed } = this.state;
    return (
      <div>
        <button className='prevBtn' onClick={ () => this.getPrevOrNextTrack('prevTrack') }>
          <img
            src={ prevBtn }
            alt='Предыдущий трек'
            title='Предыдущий трек' />
        </button>
        <button className='playBtn' onClick={() => this.startPlayTrack()}>
          <img
            src={ songIsPlayed || !this.track.paused  ? pauseBtn : playBtn }
            alt='' />
        </button>
        <button className='nextBtn' onClick={ () => this.getPrevOrNextTrack('nextTrack') }>
          <img
            src={ nextBtn }
            alt='Следующий трек'
            title='Следующий трек' />
        </button>
      </div>
    )
  }

  renderDurationProgressBar() {
    const { durationProgressBar } = this.state;
    return (
      <div className='durationProgressBarWrap' ref={ this.progressBarRef } onClick={(event) => this.getProgressBarValue(event, 'durationProgressBarWrap')}>
        <ProgressBar
          now={ durationProgressBar }
        />
      </div>
    )
  }

  renderVolumeProgressBar() {
    const { volumeProgressBar } = this.state;
    return (
      <div className='volumeProgressBarWrap' onClick={(event) => this.getProgressBarValue(event, 'volumeProgressBarWrap')}>
        <ProgressBar now={ volumeProgressBar } />
      </div>
    )
  }

  renderTrackInfo() {
    const { selectedTrack } = this.props;
    this.getCurrentTrackTime();
    return (
      <div className='selectedTrackDescription'>
        { `${ selectedTrack.trackArtist } - ${ selectedTrack.trackName }` }
        <div>
          { `
            ${ this.state.currentTrackTime ? this.state.currentTrackTime : '00:00' } /
            ${ moment.utc(moment.duration(selectedTrack.trackDuration,'s').asMilliseconds()).format('mm:ss') }
            `
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className='audioControls'>
          { this.renderAudioControlsButtons() }
          <div className='audioControlsTitle'>
            { this.renderTrackInfo() }
            { this.renderDurationProgressBar() }
          </div>
          { this.renderVolumeProgressBar() }
        </div>
      </div>
    )
  }
}
