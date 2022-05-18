import './App.css';
import PromptForm from './components/PromptForm';
import Responses from './components/Responses';
import { useState } from 'react';

function App() {
  const [responseList, setResponsetList] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      <PromptForm setResponseList={setResponsetList} setLoading={setLoading}/>
      <Responses responseList={responseList} loading={loading}/>
    </div>
  );
}

export default App;
