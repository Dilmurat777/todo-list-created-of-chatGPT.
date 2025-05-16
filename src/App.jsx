import { Toaster } from 'react-hot-toast';
import AddList from './components/AddList';
import AddTodoForm from './components/addTodoForm';
import useDarkMode from './hooks/useDarkMode';

function App() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black">
      <div className="max-w-xl mx-auto p-4 ">
        <div className="flex justify-between items-center">
          <h2
            className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-2xl font-bold mb-4`}>
            📝 Todo List
          </h2>
          <button onClick={toggleTheme}>{theme === 'dark' ? '🌞 Светлая' : '🌚 Тёмная'}</button>
        </div>
        <AddTodoForm />
        <AddList />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default App;
