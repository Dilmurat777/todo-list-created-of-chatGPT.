import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo, toggleStatus } from '../features/todos/todoSlice';

export default function AddList() {
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  if (!tasks.length) {
    return <p className="text-center text-gray-500">Список пуст</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md">
          <div className='flex-1'>
            {editingId === task.id ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <p className="font-medium">{task.title}</p>
            )}
            <p className="text-sm text-gray-600">Статус: {task.status}</p>
          </div>
          <div className="space-x-2">
            {editingId === task.id ? (
              <button
                className="text-blue-400 hover:underline"
                onClick={() => {
                  if (editedTitle.trim()) {
                    dispatch(updateTodo({ id: task.id, title: editedTitle }));
                    setEditingId(null);
                  }
                }}>
                Сохранить
              </button>
            ) : (
              <button
                className="text-blue-400 hover:underline"
                onClick={() => {
                  setEditingId(task.id);
                  setEditedTitle(task.title);
                }}>
                Редакт.
              </button>
            )}

            <button
              onClick={() => dispatch(toggleStatus(task.id))}
              className="text-green-400 hover:underline">
              Статус
            </button>
            <button
              onClick={() => dispatch(deleteTodo(task.id))}
              className="text-red-400 hover:underline">
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
