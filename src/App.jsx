import './App.css';
import AddTodoForm from './components/addTodoForm';

function App() {

  return (
   <div className='max-w-xl mx-auto'>
      <h2 className="text-2xl font-bold mb-4">📝 Todo List</h2>
      <AddTodoForm />
   </div>
  );
}

export default App;
