import './App.css';
import React from 'react';
import {
  Header,
  ContentSwitch,
  Modal
} from './Components/index'
import { generateTestPosts } from './Bloat/testData';
import { GlobalStoreContext } from './Store';
import LoadingOverlay from 'react-loading-overlay-ts';

export const testStories = generateTestPosts(20);

function App() {
  const {store} = React.useContext(GlobalStoreContext)

  return (
    
    <div id="App">
        <LoadingOverlay
          active={store.loading}
          spinner
          text='Brewing...'
        >
        <div id="header-wrapper">
          <Header />
        </div>
      <div id="content-wrapper">
          <ContentSwitch />
          <Modal />
      </div>
      </LoadingOverlay>
    </div>
  );
}

export default App;