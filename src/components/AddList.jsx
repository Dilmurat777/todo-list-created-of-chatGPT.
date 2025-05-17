import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo, toggleStatus } from '../features/todos/todoSlice';
import toast from 'react-hot-toast';
import useDarkMode from '../hooks/useDarkMode';

export default function AddList() {
  const dispatch = useDispatch();
  const { theme} = useDarkMode();
  const tasks = useSelector((state) => state.todos.tasks);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  if (!tasks.length) {
    return <p className="text-center text-gray-500">Список пуст</p>;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginatedPage = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage,
  );


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

      {paginatedPage.length === 0 ? (
        <p className="text-center text-gray-500">Ничего не найдено</p>
      ) : (
        <ul className="space-y-2 m-4">
          {paginatedPage.map((task) => (
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
                  onClick={() => {
                    dispatch(toggleStatus(task.id));
                    toast.success('Статус изменён');
                  }}
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

      {totalPages > 1 && (
        <div
          className={`flex items-center justify-center gap-4 mt-4 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-slate-600 px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
            ← Назад
          </button>
          <span>
            {currentPage} из {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-slate-600 px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
            {' '}
            Вперёд →
          </button>
        </div>
      )}
    </div>
  );
}
