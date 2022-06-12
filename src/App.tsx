import './App.css';
import { Dashboard } from './components/Customer/Dashboard';
import { MenuContextProvider } from './context/menu/menuContextProvider';

function App() { 
  return (
    <MenuContextProvider>
      <Dashboard />
    </MenuContextProvider>
  );
}

export default App;
