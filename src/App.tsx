import './App.css';
import { Todo } from './components/Todo';
import { TodoContextProvider } from './context/todo/todoContextProvider';

function App() { 
  return (
    <TodoContextProvider>
      <Todo />
    </TodoContextProvider>
  );
}

export default App;
