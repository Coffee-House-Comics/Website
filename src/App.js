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
    <div>
      <div>
        <Header />
      </div>
      <div>
        <ContentSwitch />
        <Modal />
      </div>
    </div>
  );
}

export default App;