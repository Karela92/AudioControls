import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import root from './store/reducers'

import AudioControlsContainer from './components/AudioControls/AudioControlsContainer';
import PlayListContainer from './components/PlayList/PlayListContainer';

import './App.css';

const store = createStore(root);

export default class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <AudioControlsContainer />
          <PlayListContainer />
        </div>
      </Provider>
    );
  }
}
