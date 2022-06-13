import axios from 'axios';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { MenuContextProvider } from './context/menu/menuContextProvider';

axios.defaults.baseURL = "https://b7g2-api.azurewebsites.net/";

function App() { 
  return (
    <MenuContextProvider>
      <Dashboard />
    </MenuContextProvider>
  );
}

export default App;
