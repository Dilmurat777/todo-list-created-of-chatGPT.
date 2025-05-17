import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';

const saveLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.todos.tasks);
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    console.error(err);
  }
};

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

store.subscribe(() => {
  saveLocalStorage(store.getState());
});

export default store;