export const getSelectedTrack = (track, trackIndex = 0, isSameTrack = false) => {
  return {
    type: 'SELECTED_TRACK',
    payload: {
      track,
      trackIndex,
      isSameTrack
    }
  }
};

export const updateTrackList = filteredTrackList => {
  return {
    type: 'FILTERED_TRACKLIST',
    payload: filteredTrackList,
  }
};
