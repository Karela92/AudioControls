//Захардкодженный плейлист, т.к. нет нормального API с треками
const trackList = [
  {
    trackArtist: 'Chameleon Dream',
    trackName: 'Awakening',
    trackUrl: 'https://sampleswap.org/mp3/artist/44975/Chameleon-Dream_Awakening-160.mp3',
    trackDuration: 213
  },
  {
    trackArtist: 'The Shiva Effect',
    trackName: 'Eternal Play of Forev',
    trackUrl: 'https://sampleswap.org/mp3/artist/299676/TheShivaEffect_Eternal-Play-of-Forev-160.mp3',
    trackDuration: 455
  },
  {
    trackArtist: 'Canton Snow',
    trackName: 'Break',
    trackUrl: 'https://sampleswap.org/mp3/artist/2/Canton_Snow-Break-160.mp3',
    trackDuration: 410
  }
];

const defaultState = {
  trackList,
  selectedTrack: trackList[0],
  trackIndex: 0,
  filteredTrackList: trackList,
  isSameTrack: true
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SELECTED_TRACK':
      return {
        ...state,
        selectedTrack: action.payload.track,
        trackIndex: action.payload.trackIndex,
        isSameTrack: action.payload.isSameTrack
      };
    case 'FILTERED_TRACKLIST':
      return {
        ...state,
        filteredTrackList: action.payload,
        isSameTrack: false
      };
    default:
      return state;
  }
}