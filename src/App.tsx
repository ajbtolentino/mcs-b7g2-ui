import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { MenuContextProvider } from './context/menu/menuContextProvider';
import { OrderContextProvider } from './context/order/orderContextProvider';
import { SnackbarProvider } from 'notistack';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() { 
  const { tableNumber } = useParams();
  const [number, setNumber] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    if(tableNumber?.match(/^[0-9]*$/)) {
      setNumber(+tableNumber);
    }
    else {
      navigate("/notfound");
    }
  }, []);

  return (<>
    {
      number &&
      <OrderContextProvider tableNumber={number}>
        <MenuContextProvider>
          <SnackbarProvider autoHideDuration={5000} maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Dashboard />
          </SnackbarProvider>
        </MenuContextProvider>
      </OrderContextProvider>
    }
  </>
  );
}

export default App;
