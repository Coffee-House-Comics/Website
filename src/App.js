import './App.css';
import { React } from 'react';
import {
  Header,
  ContentSwitch,
  Modal
} from './Components/index'

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