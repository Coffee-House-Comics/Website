import './App.css';
import { React } from 'react';
import {
  Header,
  ContentSwitch,
  Modal
} from './Components/index'
import { generateTestPosts } from './Bloat/testData';

export const testStories = generateTestPosts(20);

function App() {
  return (
    <div id="App">
      <div id="header-wrapper">
        <Header />
      </div>
      <div id="content-wrapper">
        <ContentSwitch />
        <Modal />
      </div>
    </div>
  );
}

export default App;