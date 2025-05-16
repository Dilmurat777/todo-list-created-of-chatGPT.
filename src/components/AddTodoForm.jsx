import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import toast from 'react-hot-toast';

export default function AddTodoForm() {
  const tasks = useSelector((state) => state.todos.tasks);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  console.log(tasks);
  // console.log(title);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!title || trimmedTitle === '') {
      toast.error('Please enter a title for the todo.');
      return;
    }

    const isDuplicate = tasks.some((item) => item.title === trimmedTitle);
    if (isDuplicate) {
      toast.error('You have already added this todo.');
      return;
    }

    dispatch(addTodo(title.trim()));
    toast.success('Todo added successfully.');
    setTitle('');
  };

  return (
    <form onSubmit={handleAddTodo} className="flex gap-2 my-4">
      <input
        className="border p-2 flex-1 rounded-sm"
        type="text"
        placeholder="add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-sky-400 text-white py-2 px-4 rounded-md" type="submit">
        Add
      </button>
    </form>
  );
}
