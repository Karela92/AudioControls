import { combineReducers } from 'redux';
import PlayList from './PlayList/reducers'

export default combineReducers({
  playList: PlayList,
});