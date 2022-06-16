import axios from 'axios';
import './App.css';
import { Dashboard } from './components/Dashboard';

axios.defaults.baseURL = "https://b7g2-api.azurewebsites.net/";

function App() { 
  return (
    <Dashboard />
  );
}

export default App;
