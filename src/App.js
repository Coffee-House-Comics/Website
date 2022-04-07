import './App.css';
import { React } from 'react';
import {
  Header,
  ContentSwitch,
  AppSwitch
} from './Components/index'
import BeansButtonPanel from './Components/Buttons/BeansButtonPanel';
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
      </div>
    </div>
  );
}

export default App;