import axios from 'axios';
import './App.css';
import { Dashboard } from './components/Dashboard';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() { 
  console.log(process.env.REACT_APP_API_URL);

  return (
    <Dashboard />
  );
}

export default App;
