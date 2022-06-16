import axios from 'axios';
import './App.css';
import { Dashboard } from './components/Dashboard';

axios.defaults.baseURL = "https://localhost:5001/";

function App() { 
  return (
    <Dashboard />
  );
}

export default App;
