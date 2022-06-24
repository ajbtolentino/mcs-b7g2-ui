import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { MenuContextProvider } from './context/menu/menuContextProvider';
import { OrderContextProvider } from './context/order/orderContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <OrderContextProvider>
      <MenuContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </MenuContextProvider>
    </OrderContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
