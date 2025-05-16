import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo, toggleStatus } from '../features/todos/todoSlice';
import toast from 'react-hot-toast';

export default function AddList() {
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!tasks.length) {
    return <p className="text-center text-gray-500">Список пуст</p>;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Поиск задачи..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded-sm"
        />
        <select
          className="border p-2 rounded-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Все</option>
          <option value="new">Новые</option>
          <option value="inProgress">В процессе</option>
          <option value="completed">Выполненные</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">Ничего не найдено</p>
      ) : (
        <ul className="space-y-2 m-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md">
              <div className="flex-1">
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
                        toast.success('Задача обновлена!');
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
                  onClick={() => { dispatch(toggleStatus(task.id)); toast.success('Статус изменён')}}
                  className="text-green-400 hover:underline">
                  Статус
                </button>
                <button
                  onClick={() => {
                    dispatch(deleteTodo(task.id));
                    toast.success('Задача удалена!');
                  }}
                  className="text-red-400 hover:underline">
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
