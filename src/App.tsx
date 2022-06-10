import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Customer/Dashboard';
import { Enter } from './components/Customer/Enter';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';

function App() { 
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="enter" element={<Enter />}/>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
